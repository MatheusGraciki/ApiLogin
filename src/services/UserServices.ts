import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';
import { authenticationMessage } from '../utils/messages.json';


interface UserCheckExistentRequest {
  username: string;
  email: string;
}


interface UserCheckExistenceReponse {
  error?:string | null;
  message?: string
}


interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}


interface RegistrationResponse {
  user?: {
    username: string;
    email: string;
    password: string;
  } | null,
  error?:string | null;

}

interface AuthenticationRequest {
  usernameOrEmail: string;
  password: string;
}


interface AuthenticationResponse {
  usernameOrEmail?: string;
  token?: string;
  error?: string;
}


class UserService {
  private async checkUserExistence({ username, email }: UserCheckExistentRequest): Promise<UserCheckExistenceReponse> {
    try {
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        if (existingUser.username === username) {
          return ({ error: authenticationMessage.USERNAME_ALREADY_EXIST });
        } else if (existingUser.email === email) {
          return ({ error: authenticationMessage.EMAIL_ALREADY_EXIST });
        }
      }

      return { error: null };
    } catch (error:unknown ) {
      console.error(`the error occurred in function checkUserExistence on archive userService.ts, error: ${error}`);

      return { error: (error as Error).message };
    }
  }

  public async createUser({ username, email, password }: RegistrationRequest): Promise<RegistrationResponse> {
    try {
      const existingUser = await this.checkUserExistence({ username, email });
      if (existingUser.error) {
        throw new Error(existingUser.error);
      }

      const createUser = await UserModel.create({ username, email, password });
      return { user: createUser, error: null };
    } catch (error:unknown) {
      console.error( `the error occurred in function createUser on archive userService.ts, error: ${error}` );
      console.log(error);
      return ({ error: (error as Error).message });
    }
  }

  // eslint-disable-next-line max-len
  public async authenticateUser({ usernameOrEmail, password }: AuthenticationRequest ): Promise<AuthenticationResponse> {
    try {
      const User = await UserModel.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
      if (!User) {
        throw new Error(authenticationMessage.INVALID_CREDENTIALS);
      }
      const isValidPassword = await bcrypt.compare(password, User.password);
      if (isValidPassword) {
        return { usernameOrEmail: usernameOrEmail };
      }

      throw new Error(authenticationMessage.INVALID_PASSWORD);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
}


export const userService = new UserService();
