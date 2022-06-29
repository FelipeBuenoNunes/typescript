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
const deposit_1 = __importDefault(require("../service/deposit"));
class Deposit {
    constructor() {
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.send(yield new deposit_1.default(req.body).create());
            }
            catch (err) {
                const _resError = err;
                if (_resError.code && _resError.code)
                    res.status(_resError.code).send(_resError);
                else
                    res.status(500).send("ERROR IN API");
            }
        });
    }
}
exports.default = Deposit;
