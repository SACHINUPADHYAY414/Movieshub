import axios from "axios";

const favorite = axios.create({
  baseURL: "http://localhost:8000/",
});

export default favorite;
