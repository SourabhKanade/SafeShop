import axios from "axios";

let BASE_URL;

if(process.env.NODE_ENV === "production"){
BASE_URL = process.env.REACT_APP_API_URL;
} else {
  BASE_URL = "http://localhost:5000/api/";
}

// const BASE_URL = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` }
});