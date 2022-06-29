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
const statement_1 = __importDefault(require("../repository/statement"));
const account_data_1 = __importDefault(require("../validations/account-data"));
const account_get_1 = __importDefault(require("./account/account-get"));
class StatementService {
    constructor(data) {
        this.data = data;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.parse();
                this.verificationAccount();
                const res = yield new statement_1.default(this.account).get();
                console.log(res);
                return { code: 200, data: res };
            }
            catch (err) {
                throw {
                    code: 400,
                    msg: err
                };
            }
        });
    }
    verificationAccount() {
        const errors = new account_data_1.default(this.account).containErrors();
        if (errors)
            throw errors;
    }
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.account = {
                "owner": "",
                "agency": this.data.agency,
                "agency_dv": this.data.agency_dv,
                "acct_number": this.data.acct_number,
                "acct_number_dv": this.data.acct_number_dv
            };
            this.account.id = yield new account_get_1.default(this.account).getIdAccount();
            console.log(this.account);
        });
    }
}
exports.default = StatementService;
