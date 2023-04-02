import React, {useEffect} from "react";
import styles from "./RadioItem.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentCategory, getProductBrandsValue} from "../../../../redux/sidebar-reducer/sidebar-selectors";
import {AppStateType} from "../../../../redux/store";
import {checkSidebarBrandTC, setCurrentCategoryTC} from "../../../../redux/sidebar-reducer/sidebar-reducer";


interface PropsType {
	name: string,
}

export const RadioItem: React.FC<PropsType> = ({name}) => {
	const dispatch = useDispatch<any>();
	const currentCategory = useSelector(getCurrentCategory);

	useEffect(() => {
		console.log(currentCategory === name)
	});

	const onCheckCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
		evt.preventDefault();
		dispatch(setCurrentCategoryTC(name));
	};


	return <li className={styles.radioList__item}>
		<label className={styles.inputBlock__label}>
			<div className={styles.inputBlock__wrap}>
				<input className={styles.input + ' ' + 'visually-hidden'}
							 name={"category"}
							 type={"checkbox"}
							 checked={currentCategory === name}
							 onChange={onCheckCheckbox}/>
				<p className={styles.inputBlock__name}>{name}</p>
			</div>
		</label>
	</li>
};
