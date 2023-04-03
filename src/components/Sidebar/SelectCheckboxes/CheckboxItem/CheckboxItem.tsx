import React from "react";
import styles from "./CheckboxItem.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getProductBrandsValue} from "../../../../redux/sidebar-reducer/sidebar-selectors";
import {AppStateType} from "../../../../redux/store";
import {checkSidebarBrandTC} from "../../../../redux/sidebar-reducer/sidebar-reducer";
import {changeSidebarBrandTC} from "../../../../redux/list-reducer/list-reducer";


interface PropsType {
	name: string,
}

export const CheckboxItem: React.FC<PropsType> = ({name}) => {
	const dispatch = useDispatch<any>();

	const checkboxesValue = useSelector((state: AppStateType) => getProductBrandsValue(state, name));


	const onCheckCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
		evt.preventDefault();
		dispatch(checkSidebarBrandTC(name));
		dispatch(changeSidebarBrandTC());
	};


	return <li className={styles.checkboxList__item}>
		<label className={styles.inputBlock__label}>
			<div className={styles.inputBlock__wrap}>
				<input className={styles.input + ' ' + 'visually-hidden'}
							 type={"checkbox"}
							 checked={checkboxesValue}
							 onChange={onCheckCheckbox}/>
				<p className={styles.inputBlock__name}>{name}</p>
			</div>
		</label>
	</li>
};