import { NextFunction, Request, Response } from "express";
import data from "../database";
import UserDatabase from "../database/UserDatabase";

export default function checkExistsUserAccount(request: Request, response: Response, next: NextFunction){
    const database = new UserDatabase(data)
    const { username } : { username: string } = request.headers as { username: string }
    
    if(database.findUserByName(username) === -1){
        return response.status(404).json({error: "user not exists"})
    }

    next()
}