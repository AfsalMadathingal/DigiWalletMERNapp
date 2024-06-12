const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {

    const token = req.cookies.token;
    console.log('===============token=====================');
    console.log(token);
    console.log('====================================');
    if (!token) {
        console.log('==================not authenticated ==================');
        console.log(res.cookies);
        console.log('====================================');
        return res.status(401).json({success: false, message: "You are not authenticated"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {

        if (err) {
            return res.status(403).json({ success: false, message: "Token is not valid" });
        }

        

        if(userInfo.role!=="user") return res.status(403).json({ success: false, message: "You are not authorized" });

        req.user = userInfo;
        next();
    });
};

module.exports = verifyUser