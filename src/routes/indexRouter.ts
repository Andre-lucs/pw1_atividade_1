import express, { Router } from "express";

const router : Router = express.Router();

router.get("/", ( req, res, next )=>{
    res.json({
        funcionando : true
    });
});

export default router;
