let users = [] //conectar banco de dados depois
import jwt from "jsonwebtoken"
const SECRET = process.env.JWT_SECRET

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token Inválido')
    }
}

export function verifica(token) {
    return readToken(token)
}

export function cadastro(body) {
    const user = users.find(({ email }) => email === body.email)
    if (user) throw new Error('Email já cadastrado')

    users.push(body)
    
    const token = createToken(body)
    return token
}

export function login(body) {
    const user = users.find(({ email }) => email === body.email)
    if (!user) throw new Error('Email ou senha incorretos')
    if (user.password !== body.password) throw new Error('Email ou senha incorretos')

    const token = createToken(user)
    return token
}