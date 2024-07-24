import { Technology, User } from "../types";

export default class UserDatabase {
    database: User[]

    constructor(database: User[]) {
        this.database = database
    }

    findUserIndex(userId: string) : number {
        return this.database.findIndex((item) => userId === item.id)
    }

    findUserByName(username: string) : number {
        return this.database.findIndex((item) => username === item.username)
    }

    getUser(username: string) : User | null{
        let userIndex = this.findUserByName(username)
        if(userIndex === -1) {
            return null
        }
        return this.database[userIndex]
    }


    getUserTechnologies(username: string) {
        const userIndex = this.findUserByName(username)

        if (userIndex == -1) {
            return null
        }

        return this.database[userIndex].technologies
    }

    createUser(user: User) : void {
        this.database.push(user)
    }

    deleteUser(userId: string) : void {
        const userIndex = this.findUserIndex(userId)
        this.database = this.database.splice(userIndex, 1)
    }

    updateUser(UserIdOld: string, newUser: User) {
        const userIndex = this.findUserIndex(UserIdOld)
        this.database[userIndex] = {
            ...newUser
        } as User
    }

    getTechnology(username: string, technologyId: string) : Technology | null{
        const userIndex = this.findUserByName(username)

        if(userIndex === -1) {
            return null
        }

        const technologyIndex = this.database[userIndex].technologies.findIndex((item) => item.id === technologyId)

        if(technologyIndex === -1) {
            return null
        }

        return this.database[userIndex].technologies[technologyIndex]

    }

    addTechnology(username: string, technology: Technology) {
        const userIndex = this.findUserByName(username) 
        this.database[userIndex].technologies.push(technology)
    }

    deleteTechnology(username: string, technologyId: string) {
        const userIndex = this.findUserByName(username)
        const technologyIndex = this.database[userIndex].technologies.findIndex((item) => item.id === technologyId)
        this.database[userIndex].technologies.splice(technologyIndex, 1)
    }

    updateTechnology(username: string, technologyId: string, newTechnology: Technology) {
        const userIndex = this.findUserByName(username)
        const technologyIndex = this.database[userIndex].technologies.findIndex((item) => item.id === technologyId)

        if(technologyIndex === -1) {
            return null
        }

        this.database[userIndex].technologies[technologyIndex] = { ...newTechnology } as Technology
        return this.database[userIndex].technologies[technologyIndex]
    }
}