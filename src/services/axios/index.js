import axios from "axios";

//PRODUCAO
const baseURL =
    window.location.protocol + "//" + window.location.hostname + ":1010";

//DESENVOLVIMENTO
//const baseURL = "http://localhost:2096"

const api = axios.create({
    baseURL: baseURL,

});

export default api;