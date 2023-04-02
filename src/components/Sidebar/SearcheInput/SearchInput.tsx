import React, {useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./SearchInput.module.scss";
import {searchObjectTC} from "../../../redux/list-reducer/list-reducer";

export const SearchInput:React.FC = () => {
	const dispatch = useDispatch<any>();
	const [value, setValue] = useState('');

	const onSearch = (evt: any) => {
		setValue(evt.currentTarget.value);
		dispatch(searchObjectTC(evt.currentTarget.value));
	};


	return <section className={styles.inputBlock}>
		<label className={styles.inputBlock__label}>
			<p className={styles.inputBlock__name}>Название</p>
			<input className={styles.input} value={value} onInput={onSearch} />
		</label>
	</section>
};