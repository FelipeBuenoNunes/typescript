import ControllerModel from "./controllerModel";
import { Response, Request } from 'express'
import InsertSql from "../services/insertSql";
import Account from "../models/account";
import validateAttrAccount from "../validators/account";


class CreateAccount extends ControllerModel{
    private data: Account|null
    private ignoreTables: string[]
    constructor() {
        super()
        this.data = null
        this.ignoreTables = ["id"]
    }

    public async handle(req: Request, res: Response) {
        try {
            const mock = {"msg": "certo"}
            
            if(req.body) this.data = this.parse(req.body)
            else throw new Error("Missing data")
            
            const errors = new validateAttrAccount(this.data as Account).containsErrors();
            if(errors)
                throw new Error(errors) 
            
            const err = await new InsertSql(this.data, "accounts").insert(...this.ignoreTables)
            if(err) throw err
            
            this.Sucess(res, 201, JSON.parse(JSON.stringify(mock)))
        } catch(err){
            console.log(err)
            this.Error(res, 400, err as Error)
        }
    }

    private parse(obj: any): Account {
        const account: Account = {
            owner: obj.owner,
            agency: obj.agency,
            agency_dv: obj.agency_dv,
            acct_number: obj.acct_number,
            acct_number_dv: obj.acct_number_dv,
            balance: obj.balance
        }
        return account
    }
}

export default CreateAccount