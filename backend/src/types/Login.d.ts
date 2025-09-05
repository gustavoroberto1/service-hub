type LoginType = {
    email: string,
    password: string
}

type CreateUserType = {
    name: string,
    email: string,
    password: string,
    role: 'NIVEL_1' | 'NIVEL_2' | 'NIVEL_3'
}