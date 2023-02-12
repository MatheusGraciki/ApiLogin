import  express from "express";
import {userController} from '../controllers/UserController';
const router = express.Router();

router.route('/auth/register').post((req,res) => userController.registerUser(req, res));

export default  router;