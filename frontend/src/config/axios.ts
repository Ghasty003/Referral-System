import axios from "axios";

// Replace with the production base url
const baseURL = "http://localhost:8080/api";

export default () => {
    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    });
}