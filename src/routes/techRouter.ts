import * as TechController from '../controllers/techController'
import express,{ Router } from 'express';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount ';

const router : Router = express.Router();

router.get("/", checkExistsUserAccount, TechController.getUserTechnologies);
router.post("/", checkExistsUserAccount, TechController.createTech);
router.put("/:id", TechController.updateTech);
router.delete("/:id", checkExistsUserAccount, TechController.deleteTech);
router.patch("/technologies/:id/studied", TechController.markStudied);


export default router;