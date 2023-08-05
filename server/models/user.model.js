const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Username is required"]
    },
    fullname: {

    },
    email:{
        type:String,
        required: [true, "Email Address is required"]
    },
    password:{
        type:String,
        required: [true, "password is required"],
        minLength: [8, "Passwords must be at least 8 characters long"]
    }
    //confirm password is not included here, it wont be included in the collection

}, {timestamps:true})

//Virtual field
//Store information from our request, but it will not be saved to the collection
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

//middleware 
UserSchema.pre("validate", function(next) {
    console.log('inside pre-validate');

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    //run the next step in the proccess
    next();
    
});


UserSchema.pre("save", function(next){
    console.log("inside pre-save");

    //encrypt the password Before it is saved to the Database
    bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
        //update the password in this instance to use the hashed returned version
        this.password = hashedPassword;
        next();
    })
    .catch((err) => {
        console.log("error while hashing the password");
    })
})



const User = mongoose.model("User", UserSchema);

module.exports = User;