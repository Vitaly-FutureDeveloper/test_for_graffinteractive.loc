import React, {useState} from "react";
import styles from "./SelectCheckboxes.module.scss";
import {getProductBrands, getProductBrandsCheckeds} from "../../../redux/sidebar-reducer/sidebar-selectors";
import {useSelector} from "react-redux";
import {CheckboxItem} from "./CheckboxItem/CheckboxItem";

export const SelectCheckboxes: React.FC = () => {
	const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);

	const productBrands = useSelector(getProductBrands);

	//Кол-во активных чекбоксов
	const productBrandsCheckeds = useSelector(getProductBrandsCheckeds);

	const onToggleShowCheckboxes = () => {
		setShowCheckboxes(!showCheckboxes);
	};



	return <section className={styles.inputBlock}>
		<h3 className={styles.inputBlock__name}>Брэнд</h3>

		<div className={styles.openBlock}>
			<div onClick={onToggleShowCheckboxes}
				className={styles.openBlock__text +  ' ' +  (showCheckboxes && styles.openBlock__text_active)}>
				Выбрано {productBrandsCheckeds}
			</div>

			<ul className={styles.checkboxList}>
				{
					productBrands?.map((checkbox) => <CheckboxItem key={checkbox.id} name={checkbox.brand} />)
				}
			</ul>
		</div>
	</section>
};