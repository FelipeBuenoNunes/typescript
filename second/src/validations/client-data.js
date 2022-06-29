"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientValidate {
    constructor(data) {
        this.errors = [];
        this.regexCpf = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
        this.regexEmail = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
        this.data = data;
    }
    containError() {
        this.hasDataNull();
        if (this.errors.length !== 0)
            return this.joinError();
        this.validateWithRegex();
        if (this.errors.length !== 0)
            return this.joinError();
    }
    hasDataNull() {
        if (!this.data.name)
            this.errors.push("name IS REQUIRED");
        if (!this.data.cpf)
            this.errors.push("cpf IS REQUIRED");
        if (!this.data.birth_date)
            this.errors.push("birth_date IS REQUIRED");
        if (!this.data.email)
            this.errors.push("email IS REQUIRED");
    }
    validateWithRegex() {
        if (!this.regexCpf.test(this.data.cpf))
            this.errors.push("cpf IS INCORRET");
        if (!this.regexEmail.test(this.data.email))
            this.errors.push("email IS INCORRET");
    }
    joinError() {
        return this.errors.join(", ");
    }
}
exports.default = ClientValidate;
