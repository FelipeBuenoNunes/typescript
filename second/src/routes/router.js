"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_account_1 = __importDefault(require("../controller/create-account"));
const deposit_1 = __importDefault(require("../controller/deposit"));
const transfer_1 = __importDefault(require("../controller/transfer"));
const withdrawals_1 = __importDefault(require("../controller/withdrawals"));
const statement_1 = __importDefault(require("../controller/statement"));
const router = (0, express_1.Router)();
router.post("/account", new create_account_1.default().handle.bind(new create_account_1.default()));
router.post("/deposit", new deposit_1.default().handle.bind(new deposit_1.default()));
router.post("/withdrawals", new withdrawals_1.default().handle.bind(new withdrawals_1.default()));
router.post("/transfer", new transfer_1.default().handle.bind(new transfer_1.default()));
router.post("/statement", new statement_1.default().handle.bind(new statement_1.default()));
exports.default = router;
