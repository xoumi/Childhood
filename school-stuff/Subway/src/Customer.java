class Customer {
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCustId() {
		return custId;
	}

	public void setCustId(int custId) {
		this.custId = custId;
	}

	private String name;
	private int custId;
	private static int id = 0;
	
	Customer(String name) {
		setName(name);
		this.custId = id++;
	}
	
	Customer() {
		name = "Bob";
		custId = id++;
	}	
}
