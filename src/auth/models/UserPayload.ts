export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    cpf_cnpj: string;
    contact: string;
    iat?: number;
    exp?: number;
}