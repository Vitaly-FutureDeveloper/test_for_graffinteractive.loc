import React from "react";
import styles from "./BlockRadios.module.scss";
import {getProductBrandsCheckeds, getProductCategories} from "../../../redux/sidebar-reducer/sidebar-selectors";
import {useSelector} from "react-redux";
import {RadioItem} from "./RadioItem/RadioItem";

export const BlockRadios: React.FC = () => {
	const productCategories = useSelector(getProductCategories);


	//Кол-во активных чекбоксов
	const productBrandsCheckeds = useSelector(getProductBrandsCheckeds);


	return <section className={styles.inputBlock}>
		<h3 className={styles.inputBlock__name}>Категории</h3>

			<ul className={styles.checkboxList}>
				{
					productCategories?.map((radio) => <RadioItem key={radio.id} name={radio.category} />)
				}
			</ul>
	</section>
};