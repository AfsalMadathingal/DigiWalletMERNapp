const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
    

    const token = req.cookies.admin_access_token;


    if (!token) {

        return res.status(401).json({ success: false, message: "You are not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {

        if (err) {
            return res.status(403).json({ success: false, message: "Token is not valid" });
        }
        if(userInfo.role!=="admin") return res.status(403).json({ success: false, message: "You are not authorized" });
        req.user = userInfo;
        next();
    });
};

module.exports = verifyAdmin