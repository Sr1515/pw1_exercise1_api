import { NextFunction, Request, Response } from "express";
import data from "../database";
import UserDatabase from "../database/UserDatabase";

export default function checkExistsUserAccount(request: Request, response: Response, next: NextFunction){
    const database = new UserDatabase(data)
    const { username } : { username: string } = request.headers as { username: string }

    const user = database.getUser(username)
    
    if(user == null){
        return response.status(404).json({error: "user not exists"})
    }

    request.body.user = user

    next()
}