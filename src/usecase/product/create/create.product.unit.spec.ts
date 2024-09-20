import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product",
    price: 100
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for create product use case", () => {
    it("should create product", async () => {
        // Arrange
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        // Act
        const output = await productCreateUseCase.execute(input);

        // Assert
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
});