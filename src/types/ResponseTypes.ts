export interface ResponseProductListType {
	products: Array<ResponseProductType>,
	total: number,
	skip: number,
	limit: number
};

export type ResponseProductType = {
	id: number,
	title: string,
	description: string,
	price: number,
	discountPercentage: number,
	rating: number,
	stock: number,
	brand: string,
	category: string,
	thumbnail: string,
	images: Array<string>
};

export type ResponseCategoriesType = Array<string>;