import express from "express";
import cors from 'cors'
import connectorDb from "./Config/DbConnection";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { rateLimit } from 'express-rate-limit'
import Teacherrouter from "./Routes/TeacherRoutes";
import Parentrouter from "./Routes/ParentRoutes";
import Studentouter from "./Routes/StudentRoutes";

const app = express();
require('dotenv').config()




app.use(express.json()); 
 app.use(cookieParser())
app.use(cors({
    origin: ["*"] //set as required for the assessment I have set *
}))
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})
app.use(limiter)

//Db connections
const dbConnectionString: string = process.env.MONGODB_URI ?? "";
const server_port: string = process.env.SERVER_PORT ?? "";
connectorDb(dbConnectionString);


//routes
app.use('/teacher', Teacherrouter)
app.use('/parent', Parentrouter)
app.use('/student', Studentouter)



//listening
const port = server_port || 3000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

