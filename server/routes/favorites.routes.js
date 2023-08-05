const express = require('express');
const router = express.Router();

const favorites = require("../controllers/favorites.controller.js");

// Create a Favorite for a user by movieId
router.post("/", favorites.create);

// Get one Favorite by movieId and userId
router.get("/:userId/:movieId", favorites.findOneByMovieIdAndUserId);

// Retrieve all Favorites by userId
router.get("/:userId", favorites.findAllByUserId);

// Delete a Favorite with movieId and userId
router.delete("/:userId/:movieId", favorites.deleteByMovieIdAndUserId);

// Delete all Favorites of a user
router.delete("/:userId", favorites.deleteAll);


module.exports = router;
