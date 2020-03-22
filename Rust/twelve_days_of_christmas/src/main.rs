fn main() {
  for (i, day) in DAYS.iter().enumerate() {
    println!("On the {} day of Christmas\nMy true love gave to me", day);

    if i == 0 { println!("A partridge in a pear tree") }
    else {
      for gift in TWELVE_GIFTS[..i + 1].iter().rev() {
        println!("{}", gift)
      }
    }
    println!("");
  }
  println!("Song: Twelve Days of Christmas");
  println!("By: John Denver, The Muppets")
}

const TWELVE_GIFTS : [&str; 12] = [
  "And a partridge in a pear tree",
  "Two turtle doves",
  "Three French hens",
  "Four calling birds",
  "Five gold rings, badam-pam-pam",
  "Six geese a laying",
  "Seven swans a swimming",
  "Eight maids a milking",
  "Nine ladies dancing",
  "Ten lords a leaping",
  "Eleven pipers piping",
  "12 drummers drumming"
];

const DAYS : [&str; 12] = [
  "first", "second", "third", "fourth", "fifth", "sixth",
  "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
];