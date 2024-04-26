const User = require("../models/user");
const bcrypt = require("bcryptjs")

async function signup(req, res){
    try {
        const {email, password} = req.body; // Get Email, Password off req body
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.create({email, password:hashedPassword});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};

function login(req, res){
    
    //get email password of user
    //find user with requested email 
};

function logout(req, res){};

module.exports = {
    signup, 
    login,
    logout, 
};