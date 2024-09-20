import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product", 100);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 100
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  };
};

describe("Unit test for product update use case", () => {
  it("should update product", async () => {
    // Arrange
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    // Act
    const output = await productUpdateUseCase.execute(input);

    // Assert
    expect(output).toEqual(input);
  });
});
