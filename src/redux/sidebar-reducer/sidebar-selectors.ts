import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getProductBrandsSelector = (state:AppStateType) => {
	return state.sidebar.brands;
};
export const getProductBrands = createSelector(getProductBrandsSelector, (brandsCheckboxes) => brandsCheckboxes);

const getProductBrandsValueSelector = (state:AppStateType, name:string) => {
	return state.sidebar.brands?.find((brand) => brand.brand === name);
};
export const getProductBrandsValue = createSelector(getProductBrandsValueSelector, (brandsChecked) => brandsChecked?.checked);

const getProductBrandsCheckedsSelector = (state:AppStateType) => {
	return state.sidebar.brands?.filter((brand) => brand.checked);
};
export const getProductBrandsCheckeds = createSelector(getProductBrandsCheckedsSelector, (brandsCheckeds) => brandsCheckeds?.length);



const getProductCategoriesSelector = (state:AppStateType) => {
	return state.sidebar.categories;
};
export const getProductCategories = createSelector(getProductCategoriesSelector, (categoriesRadios) => categoriesRadios);

const getCurrentCategorySelector = (state:AppStateType) => {
	return state.sidebar.currentCategory;
};
export const getCurrentCategory = createSelector(getCurrentCategorySelector, (CurrentCategory) => CurrentCategory);


const getSidebarInitializedSelector = (state:AppStateType) => {
	return state.sidebar.initialized;
};
export const getSidebarInitialized = createSelector(getSidebarInitializedSelector, (initialized) => initialized);


