import express from "express";
import  dbConnection  from '../database/Connection.db';
import userRoutes from '../routes/UserRoute';

class AppController {
    express: express.Application;
    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
        this.databaseConnection();
    }

    middleware(): void{
        this.express.use(express.json());
    }

    routes(){
        this.express.use(userRoutes);
    }

    databaseConnection(){
        dbConnection();
    }
}

export default new AppController().express;