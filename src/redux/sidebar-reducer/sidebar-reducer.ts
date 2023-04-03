import {SidebarBrandsRadioType, SidebarCategoriesRadioType, SidebarInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {SidebarAPI} from "../../api/SidebarAPI";
import {ResponseProductType} from "../../types/ResponseTypes";

const initialState = {
	initialized: false,
	brands: null as Array<SidebarBrandsRadioType> | null,
	categories: null as Array<SidebarCategoriesRadioType> | null,
	currentCategory: null as string | null
} as SidebarInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const sidebarReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/sidebar/INITIAL_SIDEBAR_CATEGORIES": {
			return {
				...state,
				categories: action.categories.map((item: string, i:number) => ({
					id: i,
					checked: i === 0,
					category: item,
				}))
			};
		}

		case "SN/sidebar/SET_CURRENT_SIDEBAR_CATEGORY": {
			return {
				...state,
				currentCategory: action.name as string
			};
		}

		case "SN/sidebar/INITIAL_SIDEBAR_BRANDS": {
			return {
				...state,
				brands: action.brands.map((item: string, i:number) => ({
					id: i,
					checked: true,
					brand: item,
				}))
			};
		}

		case "SN/sidebar/CHECK_SIDEBAR_BRAND": {
			const body = JSON.parse( JSON.stringify(state) );
			//@ts-ignore
			body.brands[action.index].checked = !body.brands[action.index].checked;
			return body;
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

	setCurrentCategory : (name?: string) => ({
		type: "SN/sidebar/SET_CURRENT_SIDEBAR_CATEGORY",
		name
	}) as const,

	checkSidebarBrand : (index?: number) => ({
		type: "SN/sidebar/CHECK_SIDEBAR_BRAND",
		index
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
			const productBrandsPromise = await SidebarAPI.getBrands(productCategories[0]);
			const productBrands = Array.from( new Set( productBrandsPromise.products.map((item: ResponseProductType) => item.brand) ) );


			dispatch(actions.initialSidebarCategories(productCategories));
			dispatch(actions.setCurrentCategory(productCategories[0]));

			dispatch(actions.initialSidebarBrands(productBrands));

			dispatch(actions.initializedSidebar(true));
		} catch (e) {
			throw e;
		}
	}
};

export const checkSidebarBrandTC = (name: string):ThunkType => {
	return async (dispatch, getState) => {
		//Нет эндпоинта, чтоб получить список брэндов - фильтруем вручную
		const index = getState().sidebar.brands?.findIndex((brand) => brand.brand === name);

		dispatch(actions.checkSidebarBrand(index));
	}
};

export const setCurrentCategoryTC = (name: string):ThunkType => {
	return async (dispatch, getState) => {
		const productBrandsPromise = await SidebarAPI.getBrands(name);
		const productBrands = Array.from( new Set( productBrandsPromise.products.map((item: ResponseProductType) => item.brand) ) );

		dispatch(actions.setCurrentCategory(name));
		dispatch(actions.initialSidebarBrands(productBrands));
	}
};





export default sidebarReducer;