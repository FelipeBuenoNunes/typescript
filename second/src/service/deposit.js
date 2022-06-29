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
const deposit_1 = __importDefault(require("../repository/deposit"));
const account_get_1 = __importDefault(require("./account/account-get"));
const transaction_1 = __importDefault(require("./transaction"));
class DepositService extends transaction_1.default {
    constructor(data) {
        super(data);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.verificationAccount();
                this.verificationInput();
                yield this.parseTransaction();
                this.verificationTransaction();
                const res = yield new deposit_1.default(this.transaction).deposit();
                console.log(this.transaction);
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
    parseTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = parseFloat(this.data.value) / 100;
            const idAccount = yield new account_get_1.default(this.account).getIdAccount();
            this.transaction = {
                "fgk_account_from": idAccount,
                "fgk_type": 1,
                "value": parseFloat(this.data.value),
                "rate": rate,
                "total": parseFloat(this.data.value) - rate
            };
        });
    }
}
exports.default = DepositService;
