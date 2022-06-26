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

    async insert(...ignore: string[]): Promise<Error|void> {
        try {
        let keys = "(", values = "VALUES(";
        Object.entries(this.contents).forEach((entrie) => {
            if(ignore.includes(entrie[0])) return
            keys += ` ${entrie[0]},`
            values += ` '${entrie[1]}',`   
        })
        
        values = values.replace(/.$/, ' )');
        keys = keys.replace(/.$/, ' )');
        const sql = `INSERT INTO ${this.table} ${keys} ${values}`
        console.log(sql)
        await InsertSql.connectionDB.query(sql)
        }
        catch(err) {
            return err as Error
        }
    }

    async updateBalance(...ignore: string[]): Promise<Error|void> {
        try {
            const temp = this.contents as any
            if(ignore.includes("fgk_account_to")){
                await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance+${temp.value} WHERE id='${temp.fgk_account_from}'`);
                return
            }
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance+${temp.value-1} WHERE id='${temp.fgk_account_to}'`);
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance-${temp.value} WHERE id='${temp.fgk_account_from}'`);
        }
        catch(err){
            return err as Error
        }
    }

    async withdrawals(...ignore: string[]): Promise<Error|void> {
        try {
            const temp = this.contents as any
            await InsertSql.connectionDB.query(`UPDATE accounts SET balance = balance-${temp.value+4} WHERE id='${temp.fgk_account_from}'`);
        }
        catch(err){
            return err as Error
        }
    }
}

export default InsertSql;