import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto, PatchUserDto, PutUserDto } from "../dto/user.dto";

class UsersService implements CRUD {
    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    }
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }
    async putById(id: string, resource: PutUserDto): Promise<string> {
        return UsersDao.putUserById(id, resource);
    }
    async readById(id: string) {
        return UsersDao.getUserById(id);
    }
    async deleteById(id: string): Promise<string> {
        return UsersDao.removeUserById(id);
    }
    async patchById(id: string, resource: PatchUserDto): Promise<string> {
        return UsersDao.patchUserById(id, resource);
    }
    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }
}

export default new UsersService();