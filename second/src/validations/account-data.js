"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountValidate {
    constructor(data) {
        this.errors = [];
        this.data = data;
    }
    containErrors() {
        this.hasDataNull();
        if (this.errors)
            return this.joinError();
    }
    hasDataNull() {
        if (!this.data.agency)
            this.errors.push("agency IS REQUIRED");
        if (!this.data.agency_dv)
            this.errors.push("agency_dv IS REQUIRED");
        if (!this.data.acct_number)
            this.errors.push("acct_number IS REQUIRED");
        if (!this.data.acct_number_dv)
            this.errors.push("acct_number_dv IS REQUIRED");
    }
    joinError() {
        return this.errors.join(", ");
    }
}
exports.default = AccountValidate;
