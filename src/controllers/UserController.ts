/* eslint-disable brace-style */
import { Request, Response } from 'express';
import { userService } from '../services/UserServices';
import { authenticationMessage } from '../utils/messages.json';

class UserController {
  registerUser = async (req: Request, res: Response) => {
    const userCredentials = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const newUser = await userService.createUser(userCredentials);
      if (newUser.error) {
        return res.status(409).json({ error: newUser.error });}
      else {
        return res.status(201).json({ error: authenticationMessage.ACCOUNT_CREATED });
      }
    } catch (error) {
      console.error('a error occurred in UserController, registerUser while creating user', error);
      return { error: authenticationMessage.ACCOUNT_CREATION_ERROR };
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const userCredentials = {
      usernameOrEmail: req.body.usernameOrEmail,
      password: req.body.password,
      deviceToken: req.body.deviceToken,
    };

    try {
      const authenticateUser = await userService.authenticateUser(userCredentials);

      if (authenticateUser.error) {
        res.status(404).json({ error: authenticateUser.error });
      }
      else {
        res.status(201).json({
          message: authenticationMessage.LOGIN_SUCCESSFUL, usernameOrEmail: authenticateUser.usernameOrEmail,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: authenticationMessage.LOGIN_ERROR, error });
    }
  };
}

export const userController = new UserController();
