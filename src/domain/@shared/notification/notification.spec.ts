import Notification from "./notification";

describe("Unit tests for notifications", () => {
  it("should create error", () => {
    // Arrange
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    // Act
    notification.addError(error);

    // Assert
    expect(notification.messages("customer")).toBe("customer: error message,");
  });

  it("should create errors", () => {
    // Arrange
    const notification = new Notification();
    const error1 = {
      message: "error message",
      context: "customer",
    };

    const error2 = {
      message: "error message2",
      context: "customer",
    };

    const error3 = {
      message: "error message3",
      context: "order",
    };

    // Act
    notification.addErrors([error1, error2, error3]);
    
    // Assert
    expect(notification.messages()).toBe("customer: error message,customer: error message2,order: error message3,");
  });

  it("should check if notification has at least one error", () => {
    // Arrange
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    // Act
    notification.addError(error);

    // Assert
    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    // Arrange
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    // Act
    notification.addError(error);

    // Assert
    expect(notification.getErrors()).toEqual([error]);
  });
});
