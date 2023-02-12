import  express from "express";
import userController from '../controllers/UserController';
const router = express.Router();

router.route('/auth/register').post((req,res) => userController.registerUser(req, res));
router.route('/auth/login').post((req,res) => userController.loginUser(req, res));
export default  router;