class validateWithRegex {
    private regex
    constructor(regex: RegExp) {
        this.regex = regex
    }

    private executeRegex(data: string): string | null {
        if(this.regex.test(data))
            return null
        return "This data is wrong"
    }

    public basicTestsString(data: string, type: string): string | null {
        const regex = this.executeRegex(data);
        if(regex == null) return null
        else return type + regex
    }
}

export default validateWithRegex;