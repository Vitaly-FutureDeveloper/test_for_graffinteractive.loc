import {instance} from "./api";
import {ResponseCategoriesType, ResponseProductListType} from "../types/ResponseTypes";



export const SidebarAPI = {
	getCategories() {
		return instance.get<ResponseCategoriesType>(`/products/categories`).then(response => response.data);
	},
};