import ControllerModel from "./controllerModel";
import { Response, Request } from 'express'
import Client from "../models/client";
import InsertSql from "../services/insertSql";
import validateAttrClient from "../validators/client";


class CreateClient extends ControllerModel{
    private data: Client|null
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
            
            const errors = new validateAttrClient(this.data as Client).containsErrors();
            if(errors)
                throw new Error(errors) 
            
                const err = await new InsertSql(this.data, "clients").insert(...this.ignoreTables)
                if(err) throw err
            
            this.Sucess(res, 201, JSON.parse(JSON.stringify(mock)))
        } catch(err){
            console.log(err)
            this.Error(res, 400, err as Error)
        }
    }

    private parse(obj: any): Client {
        let cpfTemp: string = obj.cpf;
        cpfTemp = cpfTemp.replaceAll(".", "");
        cpfTemp = cpfTemp.replace("-", "");
        obj.cpf = cpfTemp;
       
        const client: Client = {
            name: obj.name,
            cpf: obj.cpf,
            birth_date: obj.birth_date,
            email: obj.email
        }
        return client
    }
}

export default CreateClient