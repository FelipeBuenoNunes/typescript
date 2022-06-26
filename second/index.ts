import { http } from "./config/dotenv";
import app from "./config/express";
console.log(http.port)
app.listen(http.port)