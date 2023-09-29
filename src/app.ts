import express ,{ Express, Request, Response, NextFunction } from "express";

import errorHandling from "./middlewares/errorHandling";
import indexRouter from './routes/indexRouter';

const app : Express = express();
const port = 3000;

app.use(express.json());

app.use("/", indexRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.use(errorHandling);

app.listen(port, ()=>{
    console.log("Runing on: http://localhost:"+port);
});

export default app;