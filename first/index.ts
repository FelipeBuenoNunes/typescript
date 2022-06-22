import express, {Request, Response} from 'express';
const app = express()

const PORT = 8080

app.get('/ping', (req: Request, res: Response) => {
    res.send("pong")
})

app.listen(PORT, () => console.log("localhost:8080"))