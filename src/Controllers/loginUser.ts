import sha1 from 'sha1';

import dbReadResult from '../Util/DataBase/getDbReadResult';
import generateToken from '../Util/DataBase/jwtToken';

import { Request, Response, NextFunction } from 'express';
import { logger } from '../Configuration/logger';
import { User } from '../CollectionDefination/User';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailId, password } = req.body;
        logger.info(`Entering loginUser:: emailId : ${emailId}, password : ${password}`);

        const userDetails: User[] = await dbReadResult('users', { emailId: emailId });
        logger.info(`Debugging loginUser::userDetails: ${userDetails}`);

        if (userDetails.length === 0) {
            logger.info('Exiting loginUser::Username or password not correct');

            res.send(401).json({
                success: false,
                message: 'Username or password not correct',
            });
        } else if (userDetails.length !== 1) {
            logger.info('Exiting loginUser::Username or password not correct');

            res.send(401).json({
                success: false,
                message: 'Username or password not correct',
            });
        }

        const user = userDetails[0];
        let salt = sha1(`${emailId}__SALT_KEY`, { asString: true }) as string;
        let hash_binary = sha1(password + salt, { asString: true });
        logger.info(`Debugging loginUser::hash_binary generated`);

        let encrypted_password = Buffer.from(hash_binary + salt, 'binary').toString('base64');
        logger.info(`Debugging loginUser::encrypted_password generated`);

        if (encrypted_password !== user.encrypted_password) {
            logger.info('Exiting::loginUser');

            res.send(401).json({
                success: false,
                message: 'Username or password not correct',
            });
        } else {
            const token = generateToken(user.email, '1d');
            if (token) {
                logger.info('Exiting::loginUser ');

                res.status(200).json({
                    success: true,
                    token: 'Bearer ' + token,
                });
            } else {
                throw new Error('Token generation failed');
            }
        }
    } catch (e) {
        logger.error('Exiting::loginUser: Exception - ' + e.message);

        res.status(200).json({
            success: false,
            message: 'Username or password not correct',
        });
    }
};
