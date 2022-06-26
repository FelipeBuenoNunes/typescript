const validateValue = (str: string): string|null => {
    const n1 = parseFloat(str)
    if(n1 === NaN) return "Value is required and is a number"
    else if(n1.toString().length !== str.length) return "Has a string or space in the value"
    return null
}

export default validateValue