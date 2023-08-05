import React, { useState, useEffect } from "react";
import axios from "../../api/apiFavorites";

import "./favorite-button.scss";

function FavoriteButton({ movieId }) {
  const [favorite, setFavorite] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [btnndisable, setBtnndisable] = useState()

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (token == null) {
      setBtnndisable({ backgroundColor: "white", color: "black", boxShadow: "0px 0px 2px 2px", cursor: "not-allowed" })
    }
    async function fetchData() {
      try {
        const response = await axios.get(`/api/favorites/${userId}/${movieId}`);
        setFavorite(true);
        console.log(response.data);
      } catch (error) {
        setFavorite(false);
        console.error(error);
      }
    }
    fetchData();
  }, [userId, movieId]);

  const addFavorite = async () => {
    try {
      const response = await axios.post(`/api/favorites/`, { userId, movieId });
      console.log(response.data);
      setFavorite(true);
    } catch (error) {
      console.error(error);
    }

  };

  const removeFavorite = async () => {
    try {
      const response = await axios.delete(`/api/favorites/${userId}/${movieId}`);
      setFavorite(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {favorite ? (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={removeFavorite}
        >
          <i className="bi bi-suit-heart-fill"></i>
        </button>
      ) : (
        <button
          type="button"
          style={btnndisable}
          className="btn btn-outline-danger"
          onClick={addFavorite}
          disabled={!token}
        >
          <i className="bi bi-suit-heart"></i>
        </button>
      )}
    </div>
  );
}

export default FavoriteButton;
