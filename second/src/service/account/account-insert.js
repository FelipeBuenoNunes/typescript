"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../repository/client"));
const account_1 = __importDefault(require("../../repository/account"));
const client_data_1 = __importDefault(require("../../validations/client-data"));
class AccountInsertService {
    constructor(data) {
        this.data = data;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.parse();
                const error = this.validation();
                if (error)
                    throw error;
                const res = yield this.createAccount();
                return res;
            }
            catch (err) {
                console.log(err);
                throw {
                    code: 400,
                    msg: err
                };
            }
        });
    }
    validation() {
        const clientHasError = new client_data_1.default(this.client).containError();
        console.log(clientHasError);
        if (clientHasError)
            return clientHasError;
    }
    parse() {
        let cpfTemp = this.data.cpf;
        cpfTemp = cpfTemp.replaceAll(".", "");
        cpfTemp = cpfTemp.replace("-", "");
        this.client = {
            "name": this.data.name,
            "cpf": cpfTemp,
            "birth_date": this.data.birth_date,
            "email": this.data.email
        };
        console.log(this.client);
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idClient = yield new client_1.default(this.client).createClient();
                if (typeof idClient !== "string")
                    throw idClient;
                this.account = {
                    owner: idClient,
                    agency: this.generatorNumber(4),
                    agency_dv: this.generatorNumber(1),
                    acct_number: this.generatorNumber(8),
                    acct_number_dv: this.generatorNumber(1)
                };
                return {
                    "code": 201,
                    "data": yield new account_1.default(this.account).createAccount()
                };
            }
            catch (err) {
                const tempErr = err;
                if (tempErr.detail && tempErr.detail.includes("email") && tempErr.code === "23505")
                    throw "EMAIL ALREADY EXISTS";
                throw err;
            }
        });
    }
    generatorNumber(size) {
        let str = "";
        for (let i = 0; i < size; i++) {
            str += Math.floor(Math.random() * 10).toString();
        }
        return str;
    }
}
exports.default = AccountInsertService;
