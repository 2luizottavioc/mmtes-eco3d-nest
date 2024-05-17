export interface UserToken {
    user: User;
    token: string;
}

interface User {
    id?: number;
    email: string;
    cpf_cnpj: string;
    contact: string;
    name: string;
}