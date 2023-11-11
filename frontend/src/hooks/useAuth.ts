import axios from "../config/axios";
import { setCookie } from "../utils/cookies";

const useAuth = () => {

    const signup = async ({
        email, password, ref_code, username
    }: any) => {

        try {
            const response = await axios().post('/signup', {
                email,
                password,
                ref_code,
                username
            });
            console.log(response)

            setCookie(response.data.token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const login = async ({
        password, username
    }: any) => {

        try {
            const response = await axios().post('/login', {
                password,
                username
            });

            setCookie(response.data.token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return {
        signup,
        login
    }
}


export default useAuth;