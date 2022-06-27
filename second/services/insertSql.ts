import { Pool } from 'pg';
import pool from '../config/configDb'

class InsertSql<type> {
    private table: string
    private contents: type
    private static connectionDB: Pool = pool

    constructor(value: type, table: string){
        this.contents = value
        this.table = table
    }

    async insert(...ignore: string[]): Promise<Error|string> {
        try {
        let keys = "(", values = "VALUES(";
        Object.entries(this.contents).forEach((entrie) => {
            if(ignore.includes(entrie[0])) return
            keys += ` ${entrie[0]},`
            values += ` '${entrie[1]}',`   
        })
        
        values = values.replace(/.$/, ' )');
        keys = keys.replace(/.$/, ' )');
        const sql = `INSERT INTO ${this.table} ${keys} ${values} RETURNING id`
        console.log(sql)
        return (await InsertSql.connectionDB.query(sql)).rows[0].id
        }
        catch(err) {
            return err as Error
        }
    }

    async updateBalance(...ignore: string[]): Promise<Error|void> {
        try {
            const temp = this.contents as any
            if(ignore.includes("fgk_account_to")){
                await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance+${temp.total} WHERE id='${temp.fgk_account_from}'`);
                return
            }
            if(await this.balanceSufficient()) throw new Error("Insufficient balance")
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance+${temp.value} WHERE id='${temp.fgk_account_to}'`);
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance-${temp.total} WHERE id='${temp.fgk_account_from}'`);
        }
        catch(err){
            return err as Error
        }
    }

    async withdrawals(...ignore: string[]): Promise<Error|void> {
        try {
            const temp = this.contents as any
            if(await this.balanceSufficient()) throw new Error("Insufficient balance")
            console.log("úe")
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance-${temp.total} WHERE id='${temp.fgk_account_from}'`);
        }
        catch(err){
            return err as Error
        }
    }

    private async balanceSufficient(): Promise<boolean> {
        const temp = this.contents as any;
        const balance =  (await InsertSql.connectionDB.query(`SELECT balance FROM accounts`)).rows[0].balance;
        console.log(balance, temp.total)
        if(temp.total >= balance) return true;
        return false;
    }
}

export default InsertSql;