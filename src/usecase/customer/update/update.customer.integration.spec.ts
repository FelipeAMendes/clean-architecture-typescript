import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";
import { InputUpdateCustomerDto } from "./update.customer.dto";

describe("Test update customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input: InputUpdateCustomerDto = {
      id: "123",
      name: "John Updated",
      address: {
        street: "Street Updated",
        number: 456,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };

    const output = {
      id: "123",
      name: "John Updated",
      address: {
        street: "Street Updated",
        city: "City Updated",
        number: 456,
        zip: "Zip Updated",
      },
    };

    // Act
    const result = await usecase.execute(input);

    // Assert
    expect(result).toEqual(output);
  });
});
