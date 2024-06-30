const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"

/**
 * 1. Authentication
 * 2. adding userId to req object
 * 3. calling the next() function
 * 
 * The next() function used here is the upcoming function whereever the auth is used
 */
const auth = (req, res, next) => {

    try {
        
        let token = req.headers.authorization
        if( token ) {
            token = token.split(" ")[1]
            console.log("Token in auth: " + token);
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