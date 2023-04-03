export const SidebarAPI = {
	getSearched(text: string) {
		return fetch(`https://dummyjson.com/products/search?q=${text}`).then(response => response.json());
	},

	getCategories() {
		return fetch(`https://dummyjson.com/products/categories/?limit=0`).then(response => response.json());
	},

	getBrands(category:string) {
		//В API dummyjson.com не предусмотрено получение Брендов, поэтому берём все товары и выцепляем чекбоксы
		return fetch(`https://dummyjson.com/products/category/${category}/?limit=0`).then(response => response.json());
	},
};