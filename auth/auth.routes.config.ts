import express from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../common/common.routes.config';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import authController from './controllers/auth.controller';
import authMiddleware from './middleware/auth.middleware';

export class AuthRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'AuthRoutes');
	}

	configureRoutes(): express.Application {
		this.app.post(`/auth`, [
			body('email').isEmail(),
			body('password').isString(),
			bodyValidationMiddleware.verifyBodyFieldsErrors,
			authMiddleware.verifyUserPassword,
			authController.createJWT,
		]);
		return this.app;
	}
}
