import request from "supertest";
import supertest from "supertest";
import { app, sequelize } from "../express";
import { number } from "yup";

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create product', async () => {
        // Arrange
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product',
                price: 10
            });

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Product');
        expect(response.body.price).toBe(10);
    });

    it('should not create product', async () => {
        // Arrange
        const response = await request(app)
            .post('/product')
            .send({});

        // Assert
        expect(response.status).toBe(500);
    });

    it("should list all products as json", async () => {
        // Arrange
        await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10
            });

        await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 10
            });

        // Act
        const listResponse = await request(app).get("/product").send();

        // Assert
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(10);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(10);
    });

    it("should list all products as xml", async () => {
        // Arrange
        var product1 = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10
            });

        var product2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 10
            });

        // Act
        const listResponseXML = await request(app)
            .get("/product")
            .set("Accept", "application/xml")
            .send();

        // Assert
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<products>`);
        expect(listResponseXML.text).toContain(`<product>`);
        expect(listResponseXML.text).toContain(`<id>${product1.body.id}</id>`);
        expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
        expect(listResponseXML.text).toContain(`<price>10</price>`);
        expect(listResponseXML.text).toContain(`</product>`);
        expect(listResponseXML.text).toContain(`<id>${product2.body.id}</id>`);
        expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
        expect(listResponseXML.text).toContain(`<price>10</price>`);
        expect(listResponseXML.text).toContain(`</products>`);
    });
});