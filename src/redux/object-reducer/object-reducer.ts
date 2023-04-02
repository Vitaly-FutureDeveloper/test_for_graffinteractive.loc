import {ProductObjectInterface, ProductObjectType} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {ProductObjectAPI} from "../../api/ProductObjectAPI";

const initialState = {
	initialized: false,
	product: null as ProductObjectType | null
} as ProductObjectInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const objectReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/productObject/CLEAR_PRODUCT_OBJECT": {
			return {
				...state,
				product: null,
			};
		}

		case "SN/productObject/INITIAL_PRODUCT_OBJECT": {
			return {
				...state,
				product: {
					id: action.product.id,
					description: action.product.description,
					title: action.product.title,
					brand: action.product.brand,
					category: action.product.category,
					price: action.product.price,
					stock: action.product.stock,
				}
			};
		}

		case "SN/productObject/INITIALIZED": {
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
	clearProductObject : () => ({
		type: "SN/productObject/CLEAR_PRODUCT_OBJECT",
	}) as const,

	initialProductObject : (product: any) => ({
		type: "SN/productObject/INITIAL_PRODUCT_OBJECT",
		product
	}) as const,

	initializedProductObject : (initialized: boolean) => ({
		type: "SN/productObject/INITIALIZED",
		initialized
	}) as const,
};

export const initialProductObjectTC = (id:number):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedProductObject(false));
		try{
			const productObject = await ProductObjectAPI.getProductObject(id);
			dispatch(actions.initialProductObject(productObject));
			dispatch(actions.initializedProductObject(true));
		} catch (e) {
			throw e;
		}
	}
};

export default objectReducer;