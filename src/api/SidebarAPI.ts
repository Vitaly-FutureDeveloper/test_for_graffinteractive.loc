import {instance} from "./api";
import {ResponseCategoriesType, ResponseProductListType, ResponseProductType} from "../types/ResponseTypes";


export const SidebarAPI = {
	getSearched(text: string) {
		return instance.get<ResponseCategoriesType>(`/products/search?q=${text}`).then(response => response.data);
	},

	getCategories() {
		// return instance.get<ResponseCategoriesType>(`/products/categories`).then(response => response.data);
		return fetch(`https://dummyjson.com/products/categories`).then(response => response.json());
	},

	getBrands() {
		//В API dummyjson.com не предусмотрено получение Брендов, поэтому берём все товары и выцепляем чекбоксы
		// return instance.get<ResponseProductListType>(`/products`)
		// 	.then((response) => response.data.products.map((item: ResponseProductType) => item.brand));

		return fetch(`https://dummyjson.com/products/`).then(response => response.json());
	},
};