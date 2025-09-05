export const loginSchema = {
    body: {
        type: "object",
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email'},
            password: { type: 'string'}
        },
    },
    tags: ['Auth'],
    summary: "Endpoint para fazer Login"
}

export const registerSchema = {
    body: {
        type: "object",
        required: ['name','email', 'password', 'role'],
        properties: {
            name: { type: 'string'},
            email: { type: 'string', format: 'email'},
            password: { type: 'string'},
            role: { type: 'string'}
        },
    },
    tags: ['Auth'],
    summary: "Endpoint para fazer cadastrar usuário"
}