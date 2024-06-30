const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"

const auth = (req, res, next) => {

    try {
        
        let token = req.headers.authorization
        console.log("Raw token: " + token);
        if( token ) {
            token = token.split(" ")[1]
            console.log("Token used after split: " + token);
            let user = jwt.verify(token, SECRET_KEY)

            req.userId = user.id

        } else {
            return res.status(401).json("Unauthorized User")
        }

        next()

    } catch (error) {
        console.log("Exception occured while authenticating token (wrong token): " + error);
        return res.status(401).json("Unauthorized User")
    }
}

module.exports = auth