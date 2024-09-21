import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";
import { InputCreateCustomerDto } from "./create.customer.dto";

describe("Test create customer use case", () => {
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

  it("should create customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const input: InputCreateCustomerDto = {
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };

    const output = {
      id: expect.any(String),
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    // Act
    const result = await usecase.execute(input);

    // Assert
    expect(result).toEqual(output);
  });
});
