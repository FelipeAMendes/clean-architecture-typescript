import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address("Street", 123, "Zip", "City");
const customer = new Customer("123", "John", address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit Test find customer use case", () => {
    it("should find customer", async () => {
        // Arrange
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input: InputFindCustomerDto = {
            id: "123",
        };

        const output: OutputFindCustomerDto = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        };

        // Act
        const result = await usecase.execute(input);

        // Assert
        expect(result).toEqual(output);
    });

    it("should not find customer", async () => {
        // Arrange
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        
        const usecase = new FindCustomerUseCase(customerRepository);

        const input: InputFindCustomerDto = {
            id: "123",
        };

        // Act/Assert
        expect(() => { return usecase.execute(input); }).rejects.toThrow("Customer not found");
    });
});
