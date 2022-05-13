import { Response } from "../_constants/response.constant"

const fetchLogin = async(email: string, password: string): Promise<Response> => {
    return {
        status: 200,
        data: {
            message: "Login success",
        }
    } as Response;
}


const fetchRevalidate = async(id: string, token: string): Promise<Response> => {
    return {
        status: 200,
        data: {
            message: "Revalidate success",
        }
    }
}

export const AuthServices = {
    fetchLogin,
    fetchRevalidate
}