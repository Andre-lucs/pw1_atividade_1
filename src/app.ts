import express ,{ Express } from "express";

import errorHandling from "./middlewares/errorHandling";
import indexRouter from './routes/indexRouter';
import userRouter from './routes/userRouter';
import technologiesRouter from './routes/techRouter';

const app : Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/", indexRouter);

app.use("/users", userRouter);

app.use("/technologies", technologiesRouter);

app.use(errorHandling);

app.listen(port, ()=>{
    console.log("Runing on: http://localhost:"+port);
});

export default app;