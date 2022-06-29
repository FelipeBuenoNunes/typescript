"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionValidate {
    constructor(data) {
        this.errors = [];
        this.data = data;
    }
    containErrors() {
        this.numbers();
        console.log(this.errors);
        if (this.errors.length !== 0)
            return this.joinError();
    }
    numbers() {
        if (isNaN(this.data.value) ||
            this.data.value < 0)
            this.errors.push("VALUE IS INCORRET");
    }
    joinError() {
        return this.errors.join(", ");
    }
}
exports.default = TransactionValidate;
