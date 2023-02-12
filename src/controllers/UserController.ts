import { User } from "../models/UserModel";
import { Request, Response } from "express";

class UserController {
    async registerUser(req: Request, res: Response) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        try {
            const existentAccount = await User.findOne(user);
            if (existentAccount) {
                return res.status(400).json({ msg: "Email já cadastrado - Tente fazer login ou utilize outro email" });
            }
            const createAccount = await User.create(user);
            return res.status(201).json({ msg: "Conta criada com sucesso!", createAccount });
        }
        catch (error) {
            return res.status(500).json({ msg: "Erro ao criar conta.", error });
        }
    }
}

export const userController = new UserController();