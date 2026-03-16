import { IUser } from "../types";
import { User } from "../models";
import bcrypt from "bcrypt";

export class UserService {
    public async createUsers(userData: IUser): Promise<IUser> {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(userData.Password, saltRound);

        const users = {
            Name: userData.Name,
            Email: userData.Email,
            Password: hashedPassword,
            Role: userData.Role,
            DateCreator: new Date(),
        }
        const userCreate = await User.create(users);
        return userCreate;
    }

    public async getUsers(): Promise<IUser[]> {
        const allUsers = await User.findAll({
            attributes: { exclude: ['Password'] }
        });
        return allUsers;  
    }

    public async getUserById(idUser: number): Promise<IUser | null> {
        const user = await User.findByPk(idUser, 
            {
                attributes: { exclude: ['Password'] }
            }
        );
        return user;
    }

    public async updateUser(idUser: number, userData: IUser): Promise<IUser | null> {
        const user = await User.findByPk(idUser);
        if (user) {
            user.Name = userData.Name,
            user.Email = userData.Email,
            user.Password = userData.Password,
            user.Role = userData.Role
            if (userData.Password) {
                const saltRound = 10;
                user.Password = await bcrypt.hash(userData.Password, saltRound);
            }
        } 
        await user?.save();
        return user;
    }

    public async deleteUser(idUser: number): Promise<number> {
        const user = await User.destroy({
            where: {
                idUser
            }
        })
        return user;
    }
}