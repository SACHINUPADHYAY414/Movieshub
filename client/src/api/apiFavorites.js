import axios from "axios";

const favorite = axios.create({
  baseURL: "https://movieshub-hy9l.onrender.com",
});

export default favorite;
