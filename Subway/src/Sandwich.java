import java.util.Scanner;

public class Sandwich {
	private String breads[] = {"9-Grain Wheat", "9-Grain Honey Wheat", "Itlian", "Italian Herbs", "Monterray Cheddar", "Flatbread"};
	private String cheeses[] = {"American", "Mozzarella"};
	private String veggies[] = {"Lettuce", "Cucumbers", "Tomatoes", "Onions", "Capciscum", "Olives", "Pickles", "Jalapenos"};
	private String toppings[] = {"Red chilli", "Sweet Onion", "Tandoori Mayo", "Honey Mustard", "Mint Mayonnaise", "Marinara", "Mayonnaise", "South West", "Barbecue" };
	private double price = 0;
	private Scanner sc = new Scanner(System.in);

	
	public String getBread() {
		System.out.println("What bread would you like to have today ?");
		System.out.println("(Use the id number or the name to enter your choice. The input is case sensitive)");
		System.out.println("You can only have 1 kind of bread");
		
		int bread;
		double prices[] = {20.0, 30.0, 40.0, 50.0, 40.0, 30.0};
		
		printList(breads);
		
		do {
			System.out.println("Input: ");
			String input = sc.nextLine();
			String splitOrder[] = input.split(" ");
			bread = contains(breads, splitOrder[0]);
			if(bread == -1) {
				try { bread = Integer.parseInt(splitOrder[0]); }
				catch(NumberFormatException e) {
					System.out.println("That's not a bread I'm afraid, try again");
					continue;
				}
			}
		} while(bread != -1);
		
		price += prices[bread];
		return breads[bread];
	}
	
	public String getCheese() {
		System.out.println("What cheese on top of that ?");
		System.out.println("(Use the id number or the name to enter your choice. The input is case sensitive)");
		System.out.println("You can only have 1 kind of cheese. Enter -1 for no cheese");
		
		int cheese;
		double prices[] = {20.0, 30.0};
		
		printList(cheeses);
		
		do {
			System.out.println("Input: ");
			String input = sc.nextLine();
			String splitOrder[] = input.split(" ");
			cheese = contains(breads, splitOrder[0]);
			if(cheese == -1) {
				try { cheese = Integer.parseInt(splitOrder[0]); }
				catch(NumberFormatException e) {
					System.out.println("That's not any cheese I've heard of I'm afraid, try again");
					continue;
				}
			}
		} while(cheese != -1);
		
		if(cheese == -1) return "No cheese";
		price += prices[cheese];
		return cheeses[cheese];
	}

	public String getVeggies() {
		System.out.println("Okay, now the healthy part. What veggies on the sub ?");
		System.out.println("(Use the id number or the name to enter your choice. The input is case sensitive)");
		System.out.println("You can add upto 5 veggies(Any extras will be ignored, sorry).\nEnter -1 for no veggies.\nDelimit your choice by spaces");
		printList(veggies);
		
		int orderVeggies[];
		double prices[] = {10.0, 8.0, 5.0, 4.0, 9.0, 11.0, 7.0, 9.0};
		int count = 0;
		
		do {
			System.out.println("Input: ");
			String input = sc.nextLine();
			String splitOrder[] = input.split(" ");
			orderVeggies = new int[splitOrder.length];
			
			for(String order : splitOrder) {
				orderVeggies[count] = contains(breads, order);
				if(orderVeggies[count] == -1)
					try {
						orderVeggies[count] = Integer.parseInt(order);
						if(orderVeggies[count] == -1) return "No veggies";
						count++;
					}
					catch(NumberFormatException e) {
						System.out.println(orderVeggies[count] + " could be some exotic vegetable in some land. Unfortunately we don't have that. Try again.");
						continue;
					}
				else count++;
			}
		} while(count < 5);
		
		String order = "";
		for(int veggie : orderVeggies) {
			order.concat(veggies[veggie] + " ");
			price += prices[veggie];
		}
		
		return order;
	}
	
	public String getToppings() {
		System.out.println("Finally, the fun part. What toppings on the sub ?");
		System.out.println("(Use the id number or the name to enter your choice. The input is case sensitive)");
		System.out.println("You can add upto 3 toppings(Any extras will be ignored, sorry).\nEnter -1 for no toppings.\nDelimit your choice by spaces");
		printList(toppings);
		
		int orderToppings[];
		double prices[] = {1.0, 2.0, 3.0, 4.0, 5.0, 4.0, 3.0, 2.0, 1.0};
		int count = 0;
		
		do {
			System.out.println("Input: ");
			String input = sc.nextLine();
			String splitOrder[] = input.split(" ");
			orderToppings = new int[splitOrder.length];
			
			for(String order : splitOrder) {
				orderToppings[count] = contains(breads, order);
				if(orderToppings[count] == -1)
					try {
						orderToppings[count] = Integer.parseInt(order);
						if(orderToppings[count] == -1) return "No veggies";
						count++;
					}
					catch(NumberFormatException e) {
						System.out.println(orderToppings[count] + " isn't a topping we have, sorry. Unfortunately we don't have that. Try again.");
						continue;
					}
				else count++;
			}
		} while(count < 3);
		
		String order = "";
		for(int topping : orderToppings) {
			order.concat(veggies[topping] + " ");
			price += prices[topping];
		}
		
		return order;
	}
	
	public double getPrice() {
		return price;
	}
	
	private void printList(String n[]) {
		for(int i = 0; i < n.length; i++)
			System.out.println(i + ": " +n[i]);
	}	
	private int contains(String[] str, String check) {
		for(int i = 0; i < str.length; i++)
			if(str[i].equals(check)) return i;
		return -1;
	}
	
}