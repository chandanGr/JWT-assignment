import jwt from 'jsonwebtoken';
var secret = 'secretKey2020';

const generateToken = (tokenId: string, expiresDefault: string) => {
    var expiresDefault = '1d';

    var token = jwt.sign(
        {
            token: tokenId,
        },
        secret,
        { expiresIn: expiresDefault }
    );

    return token;
};

export default generateToken;
