import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getObjectSelector = (state:AppStateType) => {
	return state.productObject.product;
};
export const getObject = createSelector(getObjectSelector, (product) => product);


const getObjectInitializedSelector = (state:AppStateType) => {
	return state.productObject.initialized;
};
export const getObjectInitialized = createSelector(getObjectInitializedSelector, (initialized) => initialized);

