import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
	private count = 0;

	constructor() {
		this.connectWithRetry();
	}

	getMongoose() {
		return mongoose;
	}

	connectWithRetry = () => {
		log('Attempting MongoDB connection (will retry if needed)');

		mongoose
			.connect(
				`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:27017/${process.env.DBNAME}?authSource=admin`
			)
			.then(() => {
				log('MongoDB is connected');
			})
			.catch((err) => {
				const retrySeconds = 5;
				log(
					`MongoDB connection unsuccessful (will retry #${++this
						.count} after ${retrySeconds} seconds):`,
					err
				);
				setTimeout(this.connectWithRetry, retrySeconds * 1000);
			});
	};
}

export default new MongooseService();
