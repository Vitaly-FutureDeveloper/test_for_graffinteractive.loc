import React from "react";
import styles from "./Product.module.scss";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";


interface PropsType {
	id: number,
	title: string,
	category: string,
	brand: string,
};

export const Product: React.FC<PropsType> = ({id, title, category, brand}) => {
	const dispatch = useDispatch<any>();

	const onClickObject = () => {

	};

	return (
		<li className={styles.productList__item}>
			<Link to={`/object?id=${id}`}>
			<h2 className={styles.productList__title}>{title}</h2>
			<div className={styles.productList__flex}>
				<div className={styles.productList__types}>
					<p className={styles.productList__name}>Категория</p>
					<p className={styles.productList__text}>{category}</p>
				</div>

				<div className={styles.productList__types}>
					<p className={styles.productList__name}>Бренд</p>
					<p className={styles.productList__text}>{brand}</p>
				</div>
			</div>
			</Link>
		</li>
	);
};

export default React.memo(Product);