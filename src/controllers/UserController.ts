/* eslint-disable brace-style */
import { Request, Response } from 'express';
import { userService } from '../services/userServices';
import messages from '../utils/messages.json';

class UserController {
  registerUser = async (req: Request, res: Response) => {
    const userCredentials = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const newUser = await userService.createUser(userCredentials);

      if (newUser.success) {
        return res.status(201).json({ message: newUser.message });
      } else {
        return res.status(409).json({ message: newUser.message });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: messages.ACCOUNT_CREATION_ERROR });
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

      authenticateUser.success? res.status(200).json({ message: authenticateUser.message }) :
        res.status(404).json({ message: authenticateUser.message });
    } catch (error) {
      return res.status(500).json({ message: messages.LOGIN_ERROR, error });
    }
  };
}

export const userController = new UserController();
