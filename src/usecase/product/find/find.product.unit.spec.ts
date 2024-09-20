import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit Test find product use case", () => {
    it("should find product", async () => {
        // Arrange
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input: InputFindProductDto = {
            id: "123",
        };

        const output: OutputFindProductDto = {
            id: "123",
            name: "Product",
            price: 100
        };

        // Act
        const result = await usecase.execute(input);

        // Assert
        expect(result).toEqual(output);
    });

    it("should not find product", async () => {
        // Arrange
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        
        const usecase = new FindProductUseCase(productRepository);

        const input: InputFindProductDto = {
            id: "123",
        };

        // Act/Assert
        expect(() => { return usecase.execute(input); }).rejects.toThrow("Product not found");
    });
});
