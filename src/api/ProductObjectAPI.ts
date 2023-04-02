export const ProductObjectAPI = {
	getProductObject(id:number) {
		// return instance.get<ResponseProductListType>(`/products/${id}`).then(response => response.data);
		return fetch(`https://dummyjson.com/products/${id}`).then(response => response.json());
	},
};