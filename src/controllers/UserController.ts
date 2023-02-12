import { UserModel } from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const UserController = {

    async registerUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email já cadastrado - Tente fazer login ou utilize outro email" });
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const createUserAccount = await UserModel.create({ email, password});
            return res.status(201).json({ msg: "Conta criada com sucesso!"});
            
        } catch (error) {
            return res.status(500).json({ msg: "Falha ao criar a conta.", error });
        }
    },

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "O email não foi encontrado" });
        }
        try {
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ msg: "Senha inválida" });
            }
            else{return res.status(200).json({ msg: "Login realizado com sucesso!" });}
        }
        catch (error) {
            return res.status(500).json({ msg: "Erro ao fazer login.", error });
        }
    }
};

export default UserController;
