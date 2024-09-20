import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    // Arrange
    const address = new Address("Street", 1, "13330-250", "São Paulo");

    // Act
    let customer = CustomerFactory.createWithAddress("John", address);

    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});
