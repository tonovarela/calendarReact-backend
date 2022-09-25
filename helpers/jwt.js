const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, jwtSecret, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });


}
module.exports = {
    generarJWT
}


