export const ProductObjectAPI = {
	getProductObject(id:number) {
		return fetch(`https://dummyjson.com/products/${id}`).then(response => response.json());
	},
};