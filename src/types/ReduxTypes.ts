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
	brands: Array<SidebarCategoriesRadioType> | null,
	categories: Array<SidebarCategoriesRadioType> | null,
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
};

export type SidebarCategoriesRadioType = {
	checked: boolean,
	category: string,
}

