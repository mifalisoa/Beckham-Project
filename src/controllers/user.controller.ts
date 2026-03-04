import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../types/User.type";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUserController(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const users = req.body as IUser;
            
            const user = await this.userService.createUsers(users);
            res.status(200).json(user);
        } catch (error) {
            console.error("Erreur dans createUser:", error);
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    public async getUsersController(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Failed to get users" });
        }
    };

    public async getUserByIdController(req: Request, res: Response): Promise<void> {
        try {
            const id_user = Number(req.params.idUser);
            const user = await this.userService.getUserById(id_user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to get user" });
        }
    };

    public async updateUserController(req: Request, res: Response): Promise<void> {
        try {
            
            const id_user = Number(req.params.idUser);
            const users = req.body as IUser;
            
            const user = await this.userService.updateUser(id_user, users);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update user" });
        }
    };

    public async deleteUserController(req: Request, res: Response): Promise<void> {
        try {
            const id_user = Number(req.params.idUser);
            console.log(id_user);
            
            const deleted = await this.userService.deleteUser(id_user);

            if (deleted === 0) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete user" });
        }
    };
}