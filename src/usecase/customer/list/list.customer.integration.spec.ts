import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";
import { OutputListCustomerDto } from "./list.customer.dto";

describe("Test list customer use case", () => {
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

  it("should list customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = { };

    const output: OutputListCustomerDto = {
      customers: [
        {
          id: "123",
          name: "John",
          address: {
            street: "Street",
            number: 123,
            zip: "Zip",
            city: "City",
          }
        }
      ]
    };

    // Act
    const result = await usecase.execute(input);

    // Assert
    expect(result).toEqual(output);
  });
});
