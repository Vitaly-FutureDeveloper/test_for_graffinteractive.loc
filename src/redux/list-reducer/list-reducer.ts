import {ProductListInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {ProductListAPI} from "../../api/ProductListAPI";
import {ResponseProductType} from "../../types/ResponseTypes";
import {SidebarAPI} from "../../api/SidebarAPI";
import {debounce} from "../../api/decorators";

const initialState = {
	initialized: false,
	products: []
} as ProductListInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const listReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/productList/INITIAL_PRODUCT_LIST": {
			return {
				...state,
				products: action.products.map((list : ResponseProductType) => ({
					id: list.id,
					title: list.title,
					brand: list.brand,
					category: list.category,
				}))
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
	initialProductsList : (products: any) => ({
		type: "SN/productList/INITIAL_PRODUCT_LIST",
		products
	}) as const,

	initializedList : (initialized: boolean) => ({
		type: "SN/productList/INITIALIZED",
		initialized
	}) as const,
};

export const initialProductsListTC = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedList(false));
		try{
			const productList = await ProductListAPI.getProductList(1, "smartphones");
			dispatch(actions.initialProductsList(productList.products));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};

export const searchObjectTC = (text: string):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedList(false));
		try{
			const productList = await SidebarAPI.getSearched(text);

			dispatch(actions.initialProductsList(productList.products));
			dispatch(actions.initializedList(true));
		} catch (e) {
			throw e;
		}
	}
};

export default listReducer;