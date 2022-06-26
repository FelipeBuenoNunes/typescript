interface Transaction {
    id?: string
    value: number
    fgk_type: number
    fgk_account_from: string
    fgk_account_to?: string
}

export default Transaction;