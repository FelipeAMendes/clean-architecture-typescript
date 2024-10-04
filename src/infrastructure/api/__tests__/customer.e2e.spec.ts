import request from "supertest";
import supertest from "supertest";
import { app, sequelize } from "../express";
import { number } from "yup";

describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create customer', async () => {
        // Arrange
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: 'Main Street',
                    city: 'Springfield',
                    number: 123,
                    zip: '12345'
                }
            });

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.address.street).toBe('Main Street');
        expect(response.body.address.city).toBe('Springfield');
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe('12345');
    });

    it('should not create customer', async () => {
        // Arrange
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Doe'
            });

        // Assert
        expect(response.status).toBe(500);
    });

    it("should list all customers as json", async () => {
        // Arrange
        await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });

        await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 1234,
                    zip: "12344",
                },
            });

        // Act
        const listResponse = await request(app).get("/customer").send();

        // Assert
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });

    it("should list all customers as xml", async () => {
        // Arrange
        await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });

        await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 1234,
                    zip: "12344",
                },
            });

        // Act
        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();

        // Assert
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>John</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street</street>`);
        expect(listResponseXML.text).toContain(`<city>City</city>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`<name>Jane</name>`);
        expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
        expect(listResponseXML.text).toContain(`</customers>`);
    });
});