const UserController = require('../controllers/user.controller');

module.exports = (app) =>{
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/loggeduser", UserController.getUserByEmail)
}