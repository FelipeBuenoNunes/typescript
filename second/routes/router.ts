import { Router } from "express"
import CreateAccount from "../controllers/createAccount";
import CreateClient from "../controllers/createClient";
import Deposit from "../controllers/deposit";
import getStatement from "../controllers/statement";
import Transfer from "../controllers/transfer";
import Withdrawals from "../controllers/withdrawals";

const router = Router();

router.post("/account", new CreateAccount().handle.bind(new CreateAccount()))

router.post("/client", new CreateClient().handle.bind(new CreateClient()))

router.post("/deposit", new Deposit().handle.bind(new Deposit()))

router.post("/transfer", new Transfer().handle.bind(new Transfer()))

router.post("/withdrawals", new Withdrawals().handle.bind(new Withdrawals()))

router.get("/statement", getStatement)

export default router