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
class StatementSql extends _1.default {
    constructor(data) {
        super();
        this.account = data;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.query();
        });
    }
    query() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        SELECT date_time as "date time", value, rate, total, type.name, coalesce(accounts.agency, '') AS "destinatary_agency", coalesce(accounts.agency_dv, '') AS "destinatary_agency_dv", coalesce(accounts.acct_number, '') AS "destinatary_number_account", coalesce(acct_number_dv, '') AS "destinatary_number_account-dv"  FROM transactions
        INNER JOIN types_transactions AS type ON type.id=fgk_type LEFT JOIN accounts ON transactions.fgk_account_to = accounts.id WHERE fgk_account_from='${this.account.id}' OR fgk_account_to='${this.account.id}'
        `;
            console.log(query);
            const queryBalance = `
        SELECT balance FROM accounts WHERE id='${this.account.id}'
        `;
            return {
                statement: (yield this.db.query(query)).rows,
                balance: (yield this.db.query(queryBalance)).rows
            };
        });
    }
}
exports.default = StatementSql;
