import * as TechController from '../controllers/techController'
import express,{ Router } from 'express';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount ';
import checkExistsTechInUser from '../middlewares/checkExistsTechInUser';

const router : Router = express.Router();

router.get("/", checkExistsUserAccount, TechController.getUserTechnologies);
router.post("/", checkExistsUserAccount, TechController.createTech);
router.put("/:id", checkExistsUserAccount, checkExistsTechInUser, TechController.updateTech);
router.delete("/:id", checkExistsUserAccount, checkExistsTechInUser, TechController.deleteTech);
router.patch("/technologies/:id/studied", checkExistsTechInUser, checkExistsTechInUser, TechController.markStudied);


export default router;