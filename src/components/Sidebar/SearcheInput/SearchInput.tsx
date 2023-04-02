import React, {useState} from "react";
import styles from "./SearchInput.module.scss";

export const SearchInput:React.FC = () => {
	const [value, setValue] = useState('');

	const onSearch = (evt: any) => {
		setValue(evt.currentTarget.value)
	};


	return <section className={styles.inputBlock}>
		<label className={styles.inputBlock__label}>
			<p className={styles.inputBlock__name}>Название</p>
			<input className={styles.input} value={value} onInput={onSearch} />
		</label>
	</section>
};