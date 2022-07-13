import express from 'express';
import { PermissionFlag } from './common.permissionflag.enum';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
	permissionFlagRequired(requiredPermissionFlas: PermissionFlag) {
		return (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			try {
				const userPermissionFlags = parseInt(
					res.locals.jwt.permissionFlags
				);
				if (userPermissionFlags & requiredPermissionFlas) {
					next();
				} else {
					res.status(403).send();
				}
			} catch (err) {
				log(err);
			}
		};
	}
}

export default new CommonPermissionMiddleware();
