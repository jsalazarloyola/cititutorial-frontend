import { jwtDecode } from "jwt-decode";

// Modelo para login de usuario
export interface IUserPayload {
    user: string;
    password: string;
}

export class User implements IUserPayload {
    user: string;
    password: string;

    constructor(initial: Partial<IUserPayload> = {}){
        this.user = initial.user ?? "";
        this.password = initial.password ?? "";
    }

    toPlainObject(): IUserPayload {
        return {
            user: this.user,
            password: this.password
        }
    }
}

interface ILDAPResponse {
    code: number;
    expire: Date;
    token: string;
}

export interface TokenPayload {
    exp: number;
    orig_iat: number;
    user: {
        user: string;
        rut: string;
    }
}

export class LDAPResponse implements ILDAPResponse {
    code: number;
    expire: Date;
    token: string;

    constructor(initial: Partial<ILDAPResponse> = {}){
        this.code = initial.code?? 0;
        this.expire = initial.expire?? new Date();
        this.token = initial.token?? "";
    }

    public decodeToken(): TokenPayload {
        return jwtDecode<TokenPayload>(this.token);
    }
}
