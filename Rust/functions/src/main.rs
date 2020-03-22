fn main() {
  println!("in main");
  func2();
  parameter_func(10);
  println!("{}", parameter_func2(10, 20));
  let n = true;
  if n { println!("true") }
}

fn func2() { println!("in func2") }

fn parameter_func(x: i32) { println!("parameter x: {}", x) }

fn parameter_func2(x: i32, y: i32) -> i32 {
  x + y
}