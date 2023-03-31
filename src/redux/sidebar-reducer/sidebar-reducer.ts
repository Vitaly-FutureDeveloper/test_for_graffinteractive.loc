import {SidebarCategoriesRadioType, SidebarInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {SidebarAPI} from "../../api/SidebarAPI";

const initialState = {
	initialized: false,
	brands: null as Array<SidebarCategoriesRadioType> | null,
	categories: null as Array<SidebarCategoriesRadioType> | null
} as SidebarInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const sidebarReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

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

		case "SN/sidebar/INITIAL_SIDEBAR_BRANDS": {
			return {
				...state,
				brands: action.brands.map((item: string) => ({
					checked: false,
					brands: item,
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
	initialSidebarCategories : (categories: any) => ({
		type: "SN/sidebar/INITIAL_SIDEBAR_CATEGORIES",
		categories
	}) as const,

	initialSidebarBrands : (brands: any) => ({
		type: "SN/sidebar/INITIAL_SIDEBAR_BRANDS",
		brands
	}) as const,

	initializedSidebar : (initialized: boolean) => ({
		type: "SN/sidebar/INITIALIZED",
		initialized
	}) as const,
};

export const initialSidebarTC = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedSidebar(false));

		try{
			const productCategories = await SidebarAPI.getCategories();
			const productBrands = await SidebarAPI.getBrands();

			dispatch(actions.initialSidebarCategories(productCategories));
			dispatch(actions.initialSidebarBrands(productBrands));

			dispatch(actions.initializedSidebar(true));
		} catch (e) {
			throw e;
		}
	}
};

export default sidebarReducer;