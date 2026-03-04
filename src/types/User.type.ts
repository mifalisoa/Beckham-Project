import { USER_ROLE } from "../enum/user.enum"
export interface IUser {
    idUser?: number,
    Name: string,
    Email: string,
    Password: string,
    Role: USER_ROLE,
    DateCreator: Date
}

export interface IAdmin extends IUser {
    Role: USER_ROLE.ADMIN
}

export interface ICustomer extends IUser {
    Role: USER_ROLE.CUSTOMER
}