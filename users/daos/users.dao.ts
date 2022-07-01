import { CreateUserDto, PutUserDto, PatchUserDto } from '../dto/user.dto';
import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
	Schema = mongooseService.getMongoose().Schema;

	userSchema = new this.Schema(
		{
			_id: String,
			email: String,
			password: { type: String, select: false },
			firstName: String,
			lastName: String,
			permissionFlags: Number,
		},
		{ id: false }
	);

	User = mongooseService.getMongoose().model('Users', this.userSchema);

	constructor() {
		log('Created new instance of UserDao');
	}

	async addUser(userFields: CreateUserDto) {
		const userId = shortid.generate();
		const user = new this.User({
			_id: userId,
			...userFields,
			permissionFlags: 1,
		});
		await user.save();
		return userId;
	}

	async getUsers(limit = 25, page = 0) {
		return await this.User.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async getUserById(userId: string) {
		return await this.User.findOne({ _id: userId }).exec();
	}

	async updateUserById(
		userId: string,
		userFields: PatchUserDto | PutUserDto
	) {
		const existingUser = await this.User.findOneAndUpdate(
			{ _id: userId },
			{ $set: userFields },
			{ new: true }
		).exec();

		return existingUser;
	}

	async removeUserById(userId: string) {
		return await this.User.deleteOne({ _id: userId }).exec();
	}

	async getUserByEmail(email: string) {
		return await this.User.findOne({ email: email }).exec();
	}

	async getUserByEmailWithPassword(email: string) {
		return await this.User.findOne({ email: email })
			.select('_id email permissionFlags +password')
			.exec();
	}
}

export default new UsersDao();
