import Transaction from "../models/transaction";
import validateModel from "./validateModel";

class validateAttrTransaction extends validateModel {
    private transaction: Transaction;

    constructor(data: Transaction){
        super(["value", "fgk_type", "fgk_account_from", "fgk_account_to"], data)
        this.transaction = data;
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
                this.isNumber("value")
                this.isNumber("fgk_type")
            }
        }
}

export default validateAttrTransaction