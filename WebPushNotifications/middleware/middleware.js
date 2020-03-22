const jwt = require('jsonwebtoken');
const config = require('config')
const session = require('express-session')

module.exports = {
    isLoggedIn: function (req,res,next){
        const token = req.session.secure
        if(!token)
        return res.status(401).send('Access denied');
        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey')); 
            req.username = decoded;
            next();
        } catch (error) {
            res.status(400).send('Invalid Token');
        }
        
    },
}
