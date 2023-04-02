import React from "react";
import styles from "./RadioItem.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentCategory} from "../../../../redux/sidebar-reducer/sidebar-selectors";
import {setCurrentCategoryTC} from "../../../../redux/sidebar-reducer/sidebar-reducer";
import {changeCurrentCategoryTC} from "../../../../redux/list-reducer/list-reducer";


interface PropsType {
	name: string,
}

export const RadioItem: React.FC<PropsType> = ({name}) => {
	const dispatch = useDispatch<any>();
	const currentCategory = useSelector(getCurrentCategory);


	const onCheckCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
		evt.preventDefault();
		dispatch(setCurrentCategoryTC(name));
		dispatch(changeCurrentCategoryTC(name));
	};


	return <li className={styles.radioList__item}>
		<label className={styles.inputBlock__label}>
			<div className={styles.inputBlock__wrap}>
				<input className={styles.input + ' ' + 'visually-hidden'}
							 name={"category"}
							 type={"radio"}
							 checked={currentCategory === name}
							 onChange={onCheckCheckbox}/>
				<p className={styles.inputBlock__name}>{name}</p>
			</div>
		</label>
	</li>
};
