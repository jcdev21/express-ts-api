import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto, PatchUserDto, PutUserDto } from '../dto/user.dto';

class UsersService implements CRUD {
	async list(limit: number, page: number) {
		return await UsersDao.getUsers(limit, page);
	}
	async create(resource: CreateUserDto) {
		return await UsersDao.addUser(resource);
	}
	async putById(id: string, resource: PutUserDto): Promise<any> {
		return await UsersDao.updateUserById(id, resource);
	}
	async readById(id: string) {
		return await UsersDao.getUserById(id);
	}
	async deleteById(id: string): Promise<any> {
		return await UsersDao.removeUserById(id);
	}
	async patchById(id: string, resource: PatchUserDto): Promise<any> {
		return await UsersDao.updateUserById(id, resource);
	}
	async getUserByEmail(email: string) {
		return await UsersDao.getUserByEmail(email);
	}
}

export default new UsersService();
