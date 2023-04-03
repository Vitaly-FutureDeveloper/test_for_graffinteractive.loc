import React from "react";
import styles from "./CheckboxItem.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getProductBrandsValue} from "../../../../redux/sidebar-reducer/sidebar-selectors";
import {AppStateType} from "../../../../redux/store";
import {checkSidebarBrandTC} from "../../../../redux/sidebar-reducer/sidebar-reducer";
import {changeSidebarBrandTC} from "../../../../redux/list-reducer/list-reducer";
import {notify} from "../../../../api/toast";

let debounce = 0;
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

		if(debounce === 0) {
			notify("Внимание! Фильтры могут быть отдельны друг от друга, потому что нет соотвествующих ендпоинтов в открытом источнике данных! Но я старался!");
			debounce = 1;
		}
		if(debounce === 1) setTimeout(() => debounce = 0, 1500);
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