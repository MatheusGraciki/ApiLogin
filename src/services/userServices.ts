import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';
import messages from '../utils/messages.json';

interface StatusResponse {
  message?: string;
  success?: boolean;
}


interface UserExistenceCheckRequest {
  username: string;
  email: string;
}


interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}


interface RegistrationResponse {
  user: {
    username: string;
    email: string;
    password: string;
  } | null
}


interface AuthenticationRequest {
  usernameOrEmail: string;
  password: string;
  deviceToken?: string;
}


interface AuthenticationResponse {
  username?: string;
  token?: string;
}


class UserService {
  private async checkUserExistence({ username, email }: UserExistenceCheckRequest): Promise<StatusResponse | null> {
    try {
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        if (existingUser.username === username) {
          return { message: messages.USER_ALREADY_EXISTS, success: true };
        } else if (existingUser.email === email) {
          return { message: messages.EMAIL_ALREADY_EXISTS, success: true };
        }
      }

      return null;
    } catch (error) {
      console.error( `the error occurred in function checkUserExistence on archive userService.ts, error: ${error}`);
      return { message: messages.ACCOUNT_CREATION_ERROR };
    }
  }

  public async createUser({ username, email, password }: RegistrationRequest): Promise<RegistrationResponse & StatusResponse> {
    try {
      const existingUser = await this.checkUserExistence({ username, email });

      if (existingUser) {
        return { message: existingUser.message, user: null, success: false };
      }

      const createUser = await UserModel.create({ username, email, password });
      return { message: messages.ACCOUNT_CREATED, user: createUser, success: true };
    } catch (error) {
      console.error( `the error occurred in function createUser on archive userService.ts, error: ${error}` );
      return { message: messages.ACCOUNT_CREATION_ERROR, user: null, success: false };
    }
  }

  // eslint-disable-next-line max-len
  public async authenticateUser({ usernameOrEmail, password, deviceToken }: AuthenticationRequest ): Promise<AuthenticationResponse & StatusResponse> {
    const User = await UserModel.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });

    if (!User) {
      return { message: messages.INVALID_CREDENTIALS, success: false };
    }

    try {
      const isValidPassword = await bcrypt.compare(password, User.password);
      if (isValidPassword) {
        if (deviceToken) {
          return { message: messages.LOGIN_SUCCESSFUL, username: User.username, token: deviceToken, success: true };
        }

        return { message: messages.LOGIN_SUCCESSFUL, username: User.username, success: true };
      }

      return { message: messages.INVALID_PASSWORD, success: false };
    } catch (error) {
      console.error(`the error occurred in function authenticateUser on archive userService.ts, error: ${error}`);
      return { message: messages.LOGIN_ERROR, success: false };
    }
  }
}


export const userService = new UserService();
