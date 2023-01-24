import axios from "axios";



//DESENVOLVIMENTO
//const baseURL = "http://localhost:2096"

const api2 = axios.create({



    headers: {
        'Content-Type': 'application/json'
    },

});

export default api2;