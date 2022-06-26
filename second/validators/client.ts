import Client from "../models/client";
import validateModel from "./validateModel";
import validateWithRegex from "./validateWithRegex";

class validateAttrClient extends validateModel{
    private client: Client;
    private regexCpf: RegExp;
    private regexEmail: RegExp;

    constructor(data: Client){ 
        super(["name", "cpf", "birth_date", "email"], data)
        this.client = data;
        this.regexCpf = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
        this.regexEmail = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
    }

    public containsErrors(): string|null {
        this.validateRequired()

        if(this.errors.length !== 0) {
            return this.errors.join("\n")
        }
        return null
    }

    private validateRequired() {
        this.validate()

        if(this.errors.length === 0) {
            const resultCpf = new validateWithRegex(this.regexCpf).basicTestsString(this.client.cpf, "Cpf: ")
            if(resultCpf) this.errors.push(resultCpf)
            else if(this.client.cpf.length !== 11) this.errors.push("Cpf is invalid")

            const resultEmail = new validateWithRegex(this.regexEmail).basicTestsString(this.client.email, "EMAIL: ");
            if(resultEmail) this.errors.push(resultEmail)
        }
    }
}

export default validateAttrClient