require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// middleware
app.use(cors({
    //adding the ability to use credentials with cookies
    credentials:true
}));
app.use(express.json());


// configure the server to accept and update the cookies
app.use(cookieParser());

// mongoDB initialization
require("./config/db.config");

//importing user routes
require('./routes/user.routes')(app);

// add favorites routes
const favoritesRoutes = require('./routes/favorites.routes');
app.use('/api/favorites', favoritesRoutes);

const PORT = 8000;

app.listen(PORT, function () {
    console.log(`The server has started on PORT: ${PORT}`)
});
