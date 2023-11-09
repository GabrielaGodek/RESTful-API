"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coffee {
    constructor(id, name, description, price, salePrice, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.salePrice = salePrice;
        this.image = image;
        return { id, name, description, price, salePrice, image };
    }
}
exports.default = Coffee;
