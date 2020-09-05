import sha1 from 'sha1';

import dbReadResult from '../Util/DataBase/getDbReadResult';
import dbInsertOne from '../Util/DataBase/getDbInsertResults';

import { Request, Response, NextFunction } from 'express';
import { logger } from '../Configuration/logger';
import { User } from '../CollectionDefination/User';

export const signinUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailId, password } = req.body;
        logger.info(`Entering signinUser:: emailId : ${emailId}, password : ${password}`);

        const userDetails: User[] = await dbReadResult('users', { emailId: emailId });
        logger.info(`Debugging signinUser::userDetails: ${userDetails}`);

        if (userDetails.length > 0) {
            logger.info('Exiting signinUser::Email already exists');

            res.send(403).json({
                success: false,
                message: 'Email already exists',
            });
        }

        const user = userDetails[0];
        let salt = sha1(`${user.email}__SALT_KEY`, { asString: true }) as string;
        let hash_binary = sha1(password + salt, { asString: true });
        logger.info(`Debugging signinUser::hash_binary generated`);

        let encrypted_password = Buffer.from(hash_binary + salt, 'binary').toString('base64');
        logger.info(`Debugging signinUser::encrypted_password generated`);

        user.created_at = new Date();
        user.encrypted_password = encrypted_password;

        const result = await dbInsertOne('User', user);
        logger.info(`Exiting loginUser:: result: ${result}`);

        res.send({
            success: true,
            message: 'user registered successfully',
        });
    } catch (e) {
        logger.error('Exiting::signinUser: Exception - ' + e.message);

        res.status(500).json({
            success: false,
            message: 'Username or password not correct',
        });
    }
};
