import { Response } from 'express'

class ControllerModel {
    public Sucess(res: Response, code: number , response: JSON) {
        res.status(code).send(response); 
    }
    public Error(res: Response, code: number, err: Error) {
        res.status(code).send(err.message)
    }
}

export default ControllerModel