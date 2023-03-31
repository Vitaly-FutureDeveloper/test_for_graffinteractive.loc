import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});



export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	captchaErrorOccured = 10,
};







