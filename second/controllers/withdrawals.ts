import Transaction from "../models/transaction";
import ControllerModel from "./controllerModel";
import { Response, Request } from 'express'
import validateValue from "../validators/valueTransaction";
import InsertSql from "../services/insertSql";


class Withdrawals extends ControllerModel {
    private data: Transaction|null;
    private errors: string[] = []
    private ignoreTables: string[]

    constructor(){
        super()
        this.data = null
        this.ignoreTables = ["id", "fgk_account_to"]
    }

    public async handle(req: Request, res: Response) {
        try{
            if(req.body) {
                this.parse(req.body.from, req.body.value);
                console.log(this.errors)
                if(this.errors.length !== 0) throw new Error(...this.errors) 
            }

            const sql = new InsertSql(this.data, "transactions");
            const err = await sql.insert(...this.ignoreTables);
            if(err) throw err;

            const error = await sql.withdrawals(...this.ignoreTables);
            if(error) throw error;
            
            this.Sucess(res, 200, JSON.parse(JSON.stringify({sucesso: "Uhull"})))
        }
        catch(err){
            console.log(err)
            this.Error(res, 400, err as Error)
        }
    }

    private parse(from: string, value: string){
        const err = validateValue(value)
        if(err) this.errors.push(err)
        this.data = {
            value: parseFloat(value),
            fgk_type: 3,
            fgk_account_from: from
        }
    }
}

export default Withdrawals;