import Account from "../models/account";
import validateModel from "./validateModel";

const required = ["agency", "agency", "acct_number", "balance"]

class validateAttrAccount extends validateModel{
    private account: Account;
    
    constructor(data: Account){
        super(["owner", "agency", "acct_number", "balance"], data)
        this.account = data
    }

    public containsErrors(): string|null {
        this.validateRequired()

        if(this.errors.length !== 0) {
            return this.errors.join("\n")
        }
        return null
    }

    private validateRequired() {
        this.validate()

        if(this.errors.length === 0) {
            this.agencyValidate();
            this.isNumber("acct_number")
            this.balanceValidate()
            this.validateLength("agency_dv", 1)
            this.validateLength("acct_number", 8)
            this.validateLength("acct_number_dv", 1)
        }
    }

    private balanceValidate(){
        const n = parseFloat(this.account.balance)
        console.log(n)
        console.log(this.account.balance)
        if(n === NaN || n.toString().length !== this.account.balance.length) {
            this.errors.push("Has a string or space in the balance")
        }
    }
    
    private agencyValidate() {
        this.isNumber("agency")
        const length = parseInt(this.account.agency).toString().length
        if(length !== 4)
            this.errors.push("agency size is different of 4");
        
    }

    private validateLength(column: string, size: number) {
        const temp = this.account as any;
        if(temp[column].length > size) this.errors.push(column + " size is greater than " + size)
    }
}

export default validateAttrAccount