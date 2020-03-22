use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
  let ans = rand::thread_rng().gen_range(1, 10);

  loop {
    let mut guess = String::new();
    println!("Your guess: ");
    io::stdin().read_line(&mut guess)
      .expect("Failed to read line");

    let guess: u8 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => {
        println!("Invalid number, using 0");
        0
      }
    };

    match guess.cmp(&ans) {
      Ordering::Less => println!("Too small"),
      Ordering::Greater => println!("Too big"),
      Ordering::Equal => {
        println!("You win");
        break;
      }
    }
  }
}
