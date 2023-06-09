import {ProductListInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {ProductListAPI} from "../../api/ProductListAPI";
import {ResponseProductType} from "../../types/ResponseTypes";
import {SidebarAPI} from "../../api/SidebarAPI";

const initialState = {
	initialized: false,
	products: [],
	total: 0,
} as ProductListInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const listReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case "SN/productList/INITIAL_PRODUCT_LIST": {
			return {
				...state,
				products: action.products.map((list: ResponseProductType) => ({
					id: list.id,
					title: list.title,
					brand: list.brand,
					category: list.category,
				}))
			};
		}

		case "SN/productList/SET_TOTAL_LIST": {
			return {
				...state,
				total: action.total
			};
		}

		case "SN/productList/INITIALIZED": {
			return {
				...state,
				initialized: action.initialized
			};
		}


		default:
			return state;
	}
};

export const actions = {
	initialProductsList: (products: any) => ({
		type: "SN/productList/INITIAL_PRODUCT_LIST",
		products
	}) as const,

	setTotalList: (total: number) => ({
		type: "SN/productList/SET_TOTAL_LIST",
		total
	}) as const,

	initializedList: (initialized: boolean) => ({
		type: "SN/productList/INITIALIZED",
		initialized
	}) as const,
};

export const initialProductsListTC = (page:number = 1): ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.initializedList(false));
		try {
			const currentCategory = [getState().sidebar.currentCategory];
			const productCategories = currentCategory[0] ? currentCategory : await SidebarAPI.getCategories();
			const productList = await ProductListAPI.getProductList(page, productCategories[0]);

			dispatch(actions.initialProductsList(productList.products));
			dispatch(actions.setTotalList(productList.total));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};

export const searchObjectTC = (text: string): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedList(false));
		try {
			const productList = await SidebarAPI.getSearched(text);

			dispatch(actions.initialProductsList(productList.products));
			dispatch(actions.setTotalList(productList.total));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};


export const changeSidebarBrandTC = (): ThunkType => {
	return async (dispatch, getState) => {
		//Нет эндпоинта, чтоб получить список брэндов - фильтруем вручную
		try {
			const currentCategory = getState().sidebar.currentCategory;

			const productList = await ProductListAPI.getProductListUnlimit();
			const exceptionsBrands = getState().sidebar.brands?.filter((brand) => !brand.checked).map((brand) => brand.brand);

			const totalProductList = productList.products.filter((product: any) =>
				!exceptionsBrands?.includes(product.brand) && product.category.includes(currentCategory));

			dispatch(actions.initialProductsList(totalProductList));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};
export const changeCurrentCategoryTC = (category: string): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedList(false));
		try {
			const productList = await ProductListAPI.getProductList(1, category);

			dispatch(actions.initialProductsList(productList.products));
			dispatch(actions.setTotalList(productList.total));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};

export default listReducer;