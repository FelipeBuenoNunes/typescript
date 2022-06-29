"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InputAccount {
    constructor(data) {
        this.errors = [];
        this.data = data;
    }
    containsErrors() {
        if (this.data.value <= 0)
            this.errors.push("value is zero or negative");
        this.isNumberAndLength("acct_number", 8);
        this.isNumberAndLength("acct_number_dv", 1);
        this.isNumberAndLength("agency", 4);
        this.isNumberAndLength("agency_dv", 1);
        if (this.errors)
            return this.joinError();
    }
    isNumberAndLength(column, length) {
        const str = this.data[column];
        const nParse = parseFloat(str);
        if (isNaN(nParse) ||
            str.length !== length)
            this.errors.push(`${column} IS INCORRET`);
    }
    joinError() {
        return this.errors.join(", ");
    }
}
exports.default = InputAccount;
