import {instance} from "./api";
import {ResponseProductListType} from "../types/ResponseTypes";


export const ProductListAPI = {
	getProductList(currentPage:number=1, category:string="") {
		const LIMIT = 5;
		const skip = (currentPage - 1) * LIMIT;
		return instance.get<ResponseProductListType>(`/products/category/${category}?limit=${LIMIT}&skip=${skip}`).then(response => response.data);
	},
};