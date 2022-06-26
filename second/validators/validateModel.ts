class validateModel {
    private required: string[];
    public errors: string[];
    private data: any;

    constructor(required: string[], data: any){
        this.required = required
        this.errors = [];
        this.data = data;
    }

    public validate() {
        console.log(this.data)
        this.required.forEach((current) => {
            if(!this.data[current])
                this.errors.push(current + " is required!");
        })
    }

    public isNumber(column: string) {
        let data = this.data[column];
        
        const intData = parseInt(data)
        const length = intData.toString().length

        if(data.length != length || intData === NaN)
            this.errors.push("Has a string or space in the "+column)
    }
}

export default validateModel;