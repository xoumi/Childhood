import java.util.*;

public class App {
	public static void main(String args[]) {
		Scanner in = new Scanner(System.in);
		
		System.out.println("Please enter your name: ");
		Customer c = new Customer(in.nextLine());
		
		Sandwich s = new Sandwich();
		s.getBread();
		s.getCheese();
		s.getVeggies();
		s.getToppings();
		System.out.println("The price of the sandwich is: " + s.getPrice());
		
		Sides si = new Sides();
		si.getSides();
		System.out.println("The price on sides is: " + si.getPrice());
		
		System.out.println("\n Bill for " + c.getName() +",#" + c.getCustId());
		System.out.println("Sandwich:\t" + s.getPrice());
		System.out.println("Sides:\t" + si.getPrice());
		System.out.println("Total:\t" + si.getPrice() + s.getPrice());
		System.out.println("\nThankyou for dining at subway");
	}
}
