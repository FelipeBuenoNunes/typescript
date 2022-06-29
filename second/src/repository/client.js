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
class ClientSql extends _1.default {
    constructor(data) {
        super();
        this.data = data;
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.clientExists();
            //Force return string
            if (id)
                return id.toString();
            throw "CPF NOT REGISTERED";
        });
    }
    createClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.clientExists();
            if (id)
                throw ("CPF ALREADY EXISTS");
            return yield this.insertClient();
        });
    }
    clientExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query(`SELECT id FROM clients WHERE cpf='${this.data.cpf}'`)).rows[0];
            if (result)
                return result.id;
        });
    }
    insertClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO clients(name, cpf, birth_date, email) 
                VALUES('${this.data.name}', '${this.data.cpf}', '${this.data.birth_date}', '${this.data.email}') RETURNING id`;
                return (yield this.db.query(query)).rows[0].id;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = ClientSql;
