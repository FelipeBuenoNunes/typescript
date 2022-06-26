import { Response, Request } from 'express'
import pool from '../config/configDb'

async function getStatement(req: Request, res: Response) {
    try {
        const response = await pool.query(`SELECT * FROM transactions WHERE fgk_account_from = '${req.query.id}' OR fgk_account_to = '${req.query.id}'`);
        res.send(response.rows)
    }
    catch(err) {
        res.status(400).send(err)
    }

}

export default getStatement;