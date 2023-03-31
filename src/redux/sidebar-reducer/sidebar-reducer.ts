import {SidebarCategoriesRadioType, SidebarInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {ProductObjectAPI} from "../../api/ProductObjectAPI";
import {SidebarAPI} from "../../api/SidebarAPI";

const initialState = {
	initialized: false,
	categories: null as Array<SidebarCategoriesRadioType> | null
} as SidebarInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const objectReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/sidebar/INITIAL_SIDEBAR_CATEGORIES": {
			return {
				...state,
				categories: action.categories.map((item: string) => ({
					checked: false,
					category: item,
				}))
			};
		}

		case "SN/sidebar/INITIALIZED": {
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
	initialSidebarCategory : (categories: any) => ({
		type: "SN/sidebar/INITIAL_SIDEBAR_CATEGORIES",
		categories
	}) as const,

	initializedSidebar : (initialized: boolean) => ({
		type: "SN/sidebar/INITIALIZED",
		initialized
	}) as const,
};

export const initialSidebarTC = (id:number):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedSidebar(false));
		try{
			const productCategories = await SidebarAPI.getCategories();
			dispatch(actions.initialSidebarCategory(productCategories));
			dispatch(actions.initializedSidebar(true));
		} catch (e) {
			throw e;
		}
	}
};

export default objectReducer;