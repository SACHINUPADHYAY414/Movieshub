const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);

        //use the req data and the User model constructor to create a user object
        const user = new User(req.body);

        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Succesfully registered");
            res.json({
                message: "Successfully registered",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("register not successful");
            res.status(400).json(err)
        })
    },

    //login
    login: (req, res) =>{
        User.findOne({ email: req.body.email})
            .then((userRecord) => {
                //check if this returned object is null
                if(userRecord === null){
                    //email not found
                    res.status(400).json({message: "Invalid login attempt"});
                } else {
                    // the email address was found
                    //compare the address given to us in the request with the one stored in the db
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid) {
                                console.log('password is valid');
                                console.log(userRecord);
                                console.log(process.env.JWT_SECRET);
                                res.cookie("usertoken",//name of the cookie 
                                    jwt.sign({
                                        //payload is the data i want to save
                                        user_id: userRecord._id,
                                        email: userRecord.email,
                                        name: userRecord.name                                    }, 
                                    process.env.JWT_SECRET),
                                    JWT_SECRET="test",
                                    //used to sign/hash the data in the cookie
                                    {
                                        //configuration settings for this cookie
                                        httpOnly:true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                    
                                ).json({
                                    message:"succesfly logged in",
                                    userLoggedIn: userRecord.name                              })

                            }else{
                                //passwords didnt match
                                res.status(400).json({message: "Invalid login attempt"});
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({message: "Invalid login attempt"});
                        })
                }
            })
            .catch((err) => {
                console.log("error with find one")
                res.status(400).json({message: "Invalid login attempt",err});
            })
    },
    logout: (req, res) => {
        console.log("logging out!");
        res.clearCookie("usertoken"); //same name as a bove for saving the cookie
        res.json({
            message:"You have successfuly logged out"
        })
    },
    getUserByEmail: (req, res) => {
        User.findOne({ email: req.query.email }) // Use req.query.email to get the email from the request URL
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                } else {
                    res.json({ user });
                }
            })
            .catch((err) => {
                console.log("Error while getting user by email", err);
                res.status(500).json({ message: "Internal server error" });
            });
    }
}