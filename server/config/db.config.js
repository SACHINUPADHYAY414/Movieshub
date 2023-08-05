require("dotenv").config();
const mongoose = require("mongoose");


mongoose
  //.connect('mongodb://127.0.0.1:27017/MovieDb',
  .connect('mongodb+srv://Movieshub:Movieshub@movieshub.xrkpnmh.mongodb.net/Movieshub?retryWrites=true&w=majority',
   {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(() => {
      console.log(
        "Connected to database on port 8000 and database MovieDb!"
      );
  })
  .catch((err) => {
    console.log(err);
  });

