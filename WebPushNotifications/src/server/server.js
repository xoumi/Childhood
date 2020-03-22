const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const crypto = require("crypto");
require("ejs");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const config = require('config');
const middleware = require('../../middleware/middleware')

const app = express();
app.set("view engine", "ejs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});
connection.connect(err => {
  console.log(err);
  return;
});

app.use(express.static(path.join(__dirname, "../client")));
app.use('/admin/dashboard', express.static(path.join(__dirname, "../admin")));
app.use('/admin/login', express.static(path.join(__dirname, "../admin")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "sdcdscsdcdscdscds",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

const publicKey =
  "BKVhPY7EF_u8wovOfUmZJ3-3Sjv590eV-wGqmSLY7HMxhvBSW9cJxd43u7oQh-LzYRvWDi4wRhYXpmIJijJIKA8";
const privateKey = "-nEz1uI6SIRPDiO5hKSh2qtO8LM9TxXHKlWRzk3jsQ8";


if(!config.get('jwtPrivateKey')){
  console.log("FATAL ERROR: jwtPrivateKey not defined")
  process.exit(1);
}


/* REGISTER ROUTES */
app.get("/admin/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin/register.html"));
});

app.post("/admin/register", async (req, res) => {
  const token = await jwt.sign({username: req.body.username},config.get('jwtPrivateKey'));
  let users = {
    username: req.body.username,
    password: await crypto
      .createHash("md5")
      .update(req.body.pass)
      .digest("hex"),
    xAuthToken: token
  };
  if (!users) {
    return res.status(400).send("Something went wrong!");
  }
  await connection.query("insert into users set ?", users,async (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("back");
      return;
    }

   if(token){
     req.session.secure = token
    res.status(200).redirect('/admin/dashboard')
   }

    
 console.log(token);
  });

});
/* LOGIN ROUTES */
app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin/login.html"));
});

app.post("/admin/login", async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = await crypto
    .createHash("md5")
    .update(req.body.pass)
    .digest("hex");
  let sql = "select * from users where username = ?";
  //   generateAuthToken = function(){
  //     return jwt.sign({
  //         username: req.body.username},'sacsdjkcsjkdcjkdscdscsd')
  // }
  // console.log(generateAuthToken());
  await connection.query(sql, [username], (error, results, fields) => {
    if (error)
      res.status(400).send({
        code: 400,
        failed: "error ocurred"
      });
    if (results.length > 0)
      if (results[0].password == password) {
        var sess = req.session;
        sess.secure = results[0].xAuthToken
        res.redirect("/admin/dashboard");

        //sessionStorage.SessionName = "x-auth-token"

        console.log("here");
      } else
        res.status(204).send({
          code: 204,
          success: "Email and password does not match"
        });
    else
      res.status(204).send({
        code: 204,
        success: "Email oes not exits"
      });
  });
});


app.get("/admin/logout",(req,res)=>{
  req.session.secure = null;
  res.redirect("/admin/login")
})

app.get("/admin/dashboard",middleware.isLoggedIn, (req, res) => {
  
  res.sendFile(path.join(__dirname, "../admin/dashboard.html"))
});

app.post("/admin/dashboard",middleware.isLoggedIn, (req, res) => {
  console.log(`Sending Title: ${req.body.title},\nBody: ${req.body.body}\n`);

  let sql = "select * from subscriptions";
  connection.query(sql, (err, result) => {
    Object.keys(result).forEach(key => {
      console.log(`intiating work for ${key}`);
      let row = result[key];
      let arranged = {
        endpoint: row.endpoint,
        keys: {
          p256dh: row.pdh,
          auth: row.auth
        }
      };
      var options = {
        vapidDetails: {
          subject: "mailto:xoumi712@gmail.com",
          publicKey: publicKey,
          privateKey: privateKey
        },
        TTL: 60
      };
      const payload = JSON.stringify({
        title: req.body.title,
        body: req.body.body,
        icon: "icon-url"
      });
      webpush
        .sendNotification(arranged, payload, options)
        .catch(err => console.log(err));
    });
    console.log("\nWebpush completed");
  });
  res.redirect("back");
});

app.get("/api/publicKey", (req, res) => {
  res.json({ publicKey: publicKey });
});

app.post("/sendsub", (req, res) => {
  res.status(201).json({});

  const endpoint = req.body.endpoint;
  const pdh = req.body.keys.p256dh;
  const auth = req.body.keys.auth;

  let post = { endpoint: endpoint, pdh: pdh, auth: auth };
  let sql = `insert into subscriptions set ?`;
  connection.query(sql, post, (err, result) => {
    if (err) console.log("Entry xists");
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server started on ${port}`));
