import { Response, Request } from 'express'
import pool from '../config/configDb'

async function getStatement(req: Request, res: Response) {
    try {
        const history = await pool.query(`SELECT * FROM transactions WHERE fgk_account_from = '${req.query.id}' OR fgk_account_to = '${req.query.id}'`);
        const balance = await pool.query(`SELECT balance FROM accounts WHERE id = '${req.query.id}'`);
        res.send({
            history: history.rows,
            balance: balance.rows
        });

    }
    catch(err) {
        res.status(400).send(err)
    }

}

export default getStatement;