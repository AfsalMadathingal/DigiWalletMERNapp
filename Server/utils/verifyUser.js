const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("You are not authenticated");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        req.user = userInfo;
        next();
    });
};

module.exports = verifyUser