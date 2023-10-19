import { Request, Response, NextFunction } from "express";
import BaseError from "../types/BaseError";

export default (err : BaseError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send(err.message);
};