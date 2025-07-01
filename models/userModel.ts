// Modelo para login de usuario
export interface IUserPayload {
    username: string;
    password: string;
}

export class User implements IUserPayload {
    username: string;
    password: string;

    constructor(initial: Partial<IUserPayload> = {}){
        this.username = initial.username ?? "";
        this.password = initial.password ?? "";
    }

    toPlainObject(): IUserPayload {
        return {
            username: this.username,
            password: this.password
        }
    }
}
