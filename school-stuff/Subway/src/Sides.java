import java.util.Scanner;

public class Sides {
	private String sides[] = {"Chips", "Cookies", "Cheese", "Coffee"};

	Scanner sc = new Scanner(System.in);
	double price = 0;

	public String getSides() {
		System.out.println("With that out of the way, let's pick our sides");
		System.out.println("(Use the id number or the name to enter your choice. The input is case sensitive)");
		System.out.println("You can add upto 3 sides(Any extras will be ignored).\nEnter -1 for no veggies but your sandwich will be lonely.\nDelimit your choice by spaces");
		printList(sides);
		
		int orderSides[];
		double prices[] = {5.0, 6.0, 3.0, 2.0};
		
		int count = 0;
		
		do {
			System.out.println("Input: ");
			String input = sc.nextLine();
			String splitOrder[] = input.split(" ");
			orderSides = new int[splitOrder.length];
			
			for(String order : splitOrder) {
				orderSides[count] = contains(sides, order);
				if(orderSides[count] == -1)
					try {
						orderSides[count] = Integer.parseInt(order);
						if(orderSides[count] == -1) return "No veggies";
						count++;
					}
					catch(NumberFormatException e) {
						System.out.println(orderSides[count] + " could be some exotic vegetable in some land. Unfortunately we don't have that. Try again.");
						continue;
					}
				else count++;
			}
		} while(count < 5);
		
		String order = "";
		for(int side : orderSides) {
			order.concat(sides[side] + " ");
			price += prices[side];
		}
		
		return order;
	}
	
	public double getPrice() { return price; }
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
