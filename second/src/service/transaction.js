"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_data_1 = __importDefault(require("../validations/account-data"));
const account_input_1 = __importDefault(require("../validations/input-user/account-input"));
const transaction_data_1 = __importDefault(require("../validations/transaction-data"));
class TransactionService {
    constructor(data) {
        this.data = data;
        this.parse();
    }
    verificationAccount() {
        const errors = new account_data_1.default(this.account).containErrors();
        if (errors)
            throw errors;
    }
    verificationTransaction() {
        let errors = new transaction_data_1.default(this.transaction).containErrors();
        if (errors)
            throw errors;
    }
    verificationInput() {
        let errors = new account_input_1.default(this.data).containsErrors();
        if (errors)
            throw errors;
    }
    parse() {
        this.account = {
            "owner": "",
            "agency": this.data.agency,
            "agency_dv": this.data.agency_dv,
            "acct_number": this.data.acct_number,
            "acct_number_dv": this.data.acct_number_dv
        };
    }
}
exports.default = TransactionService;
