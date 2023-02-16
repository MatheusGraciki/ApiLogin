import { UserModel } from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const UserController = {
    async registerUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const userFound = await UserModel.find({ $or: [{ username }, { email }] });
            
            if (userFound.length > 0) {
                const usernameFound = userFound[0].username;
                const emailFound = userFound[0].email;
                
                const usernameExist = usernameFound === username;
                const emailExist = emailFound === email;
               
                if (usernameExist){
                    const errorMessage = "Este usuario já existe tente outro...";
                    return res.status(409).json({ message: errorMessage });
                }

                else if (emailExist){
                    const errorMessage = "Este email  já está em uso, tente outro ou faça login";
                    return res.status(409).json({ message: errorMessage });
                }
            }
            
        
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const newUser = await UserModel.create({ username, email, password });
            return res.status(201).json({ message: 'Conta criada com sucesso!' });
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar a conta' });
        }
          
    },

    async loginUser(req: Request, res: Response) {
        const { emailOrUsername, password,deviceToken } = req.body;
        const user = await UserModel.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        try {
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (passwordIsValid) {
                if(deviceToken ){
                    return res.status(200).json({ message: "Login realizado com sucesso!",username: user.username, token: deviceToken });
                }
                return res.status(200).json({ message: "Login realizado com sucesso!",username: user.username});
                
            }

            return res.status(401).json({ message: "Senha inválida" });
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao fazer login", error });
        }

    }
};

export default UserController;
