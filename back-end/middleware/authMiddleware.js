const jwt = require("jsonwebtoken");
const checkAdmin = (req,res,next) => {
    let token = req.headers["authorization"]
    token = token.split(" ")[1]
    let user = jwt.verify(token, process.env.JWT_SECRET)
    if(user.user.role == "admin"){
        next()
    }else{
        res.status(403).json({message: "you don't have enough privilege"})

    }
}

module.exports = { checkAdmin }

const checkRole = (req,res,next) => {
    let token = req.headers["authorization"]
    token = token.split(" ")[1]
    let user = jwt.verify(token, process.env.JWT_SECRET)
    if(user.user.role == "admin" || user.user.role =="manager"){
        next()
    }else{
        res.status(403).json({message: "you don't have enough privilege"})

    }
}


module.exports = { checkRole }