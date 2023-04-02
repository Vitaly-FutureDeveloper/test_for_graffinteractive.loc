export interface ProductListInterface {
	initialized: boolean,
	products: Array<ProductListType>,
};

export interface ProductObjectInterface {
	initialized: boolean,
	product: ProductObjectType | null,
};

export interface SidebarInterface {
	initialized: boolean,
	brands: Array<SidebarBrandsRadioType> | null,
	categories: Array<SidebarCategoriesRadioType> | null,
	currentCategory: string | null,
};

export type ProductListType = {
	id: number,
	title: string,
	brand: string,
	category: string,
};

export type ProductObjectType = {
	id: number,
	title: string,
	description: string,
	brand: string,
	category: string,
	price: number,
	stock: number,
};

export type SidebarCategoriesRadioType = {
	id: number,
	checked: boolean,
	category: string,
}

export type SidebarBrandsRadioType = {
	id: number,
	checked: boolean,
	brand: string,
}

