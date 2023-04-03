export const ProductListAPI = {
	getProductList(currentPage:number=1, category:string="") {
		const LIMIT = 4;
		const skip = (currentPage - 1) * LIMIT;
		return fetch(`https://dummyjson.com/products/category/${category}/?limit=${LIMIT}&skip=${skip}`).then(response => response.json());
	},

	getProductListUnlimit() {
		return fetch(`https://dummyjson.com/products/?limit=0`).then(response => response.json());
	},
};