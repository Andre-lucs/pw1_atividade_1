import express,{ Router } from 'express';
import * as UserController from '../controllers/userController';
import checkValidUser from '../middlewares/checkValidUser';

const router : Router = express.Router();

router.get("/", UserController.findAll);

router.post("/", checkValidUser ,UserController.insert);

export default router;