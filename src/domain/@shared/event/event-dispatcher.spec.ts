import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    // Act
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // Assert
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // Act
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    // Assert
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // Act
    eventDispatcher.unregisterAll();

    // Assert
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Act
    eventDispatcher.notify(productCreatedEvent);

    // Assert
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
