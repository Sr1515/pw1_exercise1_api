import data from "../database";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { Technology, User } from "../types";
import UserDatabase from "../database/UserDatabase";

class UserController {

    createUser(request: Request, response: Response) {
        const database = new UserDatabase(data)
        const { name, username } : { name: string, username: string} = request.body

        if (database.findUserByName(username) !== -1) {
            return response.status(400).json({error: 'Usuario já existe'})
        }

        const user: User = {
            id: v4(),
            name,
            username, 
            technologies: [] as Technology[]
        }

        database.createUser(user)
        return response.status(201).json(user)
    }

    getUserTechnologies(request: Request, response: Response) {
        const database = new UserDatabase(data)
        const  username : string = request.body.user.username
        const technologies = database.getUserTechnologies(username)
        return response.json(technologies)
    }

    createTechnology(request: Request, response: Response) {
        const database = new UserDatabase(data)
        const  username : string = request.body.user.username
        const { title, deadline} : { title: string, deadline: string} = request.body

        if(new Date(deadline) < new Date()) {
            return response.status(400).json({error: "Data inválida"})
        }

        const technology: Technology = {
            id: v4(),
            title,
            deadline: new Date(deadline),
            created_at: new Date(),
            studied: false
        } 

        database.addTechnology(username, technology)
        response.status(201).json(database.getUserTechnologies(username))
    }

    updateTechnology(request: Request, response: Response) {
        const database = new UserDatabase(data)
        const  username : string = request.body.user.username
        const { title, deadline } : { title: string, deadline: string } = request.body
        const { id }: { id: string } = request.params as { id : string }

        const technologyOld = database.getTechnology(username, id)

        if(!technologyOld){
            return response.status(404).json({error: "Tecnologia não encontrada"})
        }

        if(!!deadline && new Date(deadline) < new Date()){
            return response.status(400).json({error: "Invalid date"})
        }

        const technologyNew: Technology = {
            ...technologyOld,
            title: !!title ? title : technologyOld.title,
            deadline: deadline ? new Date(deadline) : technologyOld.deadline
        } 


        const technology = database.updateTechnology(username, id, technologyNew)
        response.json(technology)
    }
 
    updateTechnologyState(request: Request, response: Response) {
        const database = new UserDatabase(data)
        const  username : string = request.body.user.username 
        const { id }: { id: string } = request.params as { id : string }

        const getTechnology = database.getTechnology(username, id)

        if(!getTechnology){
            return response.status(404).json({error: "tecnologia não encontrada"})
        }

        const newTechnology: Technology = {
            ...getTechnology,
            studied: true
        } 

        const technology = database.updateTechnology(username, id, newTechnology)
        response.json(technology)
        
    }

    deleteTechnology(request: Request, response: Response){
        const database = new UserDatabase(data)
        const  username : string = request.body.user.username 
        const { id }: { id: string } = request.params as { id : string }

        if(!database.getTechnology(username, id)){
            return response.status(404).json({error: "Tecnologia não encontrada"})
        }

        database.deleteTechnology(username, id)
        response.status(200).json(database.getUserTechnologies(username))
    }
}

export default UserController