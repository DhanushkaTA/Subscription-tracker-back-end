import {Router} from "express";
import {getAllUsers, getUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, getAllUsers)

userRouter.get('/:id',authorize, getUser)
export default userRouter;