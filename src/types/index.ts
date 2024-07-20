export type User = {
    id: String,
    name: String,
    username: String,
    technologies: Technology[]
}

export type Technology = {
    id: string, 
    title: string,
    studied: boolean,
    deadline: Date,
    created_at: Date
}