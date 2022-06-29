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
const _1 = __importDefault(require("."));
class AccountSql extends _1.default {
    constructor(data) {
        super();
        this.data = data;
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO accounts(owner, agency, agency_dv, acct_number, acct_number_dv, balance)
            VALUES('${this.data.owner}', '${this.data.agency}', '${this.data.agency_dv}', '${this.data.acct_number}', '${this.data.acct_number_dv}', '0') RETURNING agency, agency_dv, acct_number, acct_number_dv`;
            return (yield this.db.query(query)).rows[0];
        });
    }
    idAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id FROM accounts 
            WHERE agency='${this.data.agency}' AND agency_dv='${this.data.agency_dv}' AND acct_number='${this.data.acct_number}' AND acct_number_dv='${this.data.acct_number_dv}'`;
            const response = (yield this.db.query(query)).rows[0];
            if (response)
                return response.id;
        });
    }
    getBalance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = (yield this.db.query(`SELECT balance FROM accounts WHERE id='${id}'`)).rows[0].balance;
            console.log(balance);
            return balance;
        });
    }
}
exports.default = AccountSql;
