import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import styles from "./ProductObject.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {actions, initialProductObjectTC} from "../../redux/object-reducer/object-reducer";
import {getObject} from "../../redux/object-reducer/object-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";

export const ProductObject: React.FC = () => {
	const dispatch = useDispatch<any>();
	const [searchParams] = useSearchParams();

	const productObject = useSelector(getObject);

	useEffect(() => {
		const idParam = Number(searchParams.get('id'));
		dispatch(initialProductObjectTC(idParam));

		return () => dispatch(actions.clearProductObject());
	}, []);

	return (
		!productObject ?
			<LoadingSpinner/>

			:

			<section className={styles.productObjectSection}>
				<h2 className={styles.title}>{productObject.title}</h2>

				<div className={styles.productObject__grid}>
					<div className={styles.productObject__types}>
						<p className={styles.productObject__name}>Категория</p>
						<p className={styles.productObject__text}>{productObject.category}</p>
					</div>

					<div className={styles.productObject__types}>
						<p className={styles.productObject__name}>Бренд</p>
						<p className={styles.productObject__text}>{productObject.brand}</p>
					</div>

					<div className={styles.productObject__types}>
						<p className={styles.productObject__name}>Цена</p>
						<p className={styles.productObject__text}>{productObject.price} баксов</p>
					</div>

					<div className={styles.productObject__types}>
						<p className={styles.productObject__name}>Остаток</p>
						<p className={styles.productObject__text}>{productObject.stock}</p>
					</div>

					<div className={styles.productObject__descBlock}>
						<p className={styles.productObject__desc}>Описание</p>
						<p className={styles.productObject__text}>{productObject.description}</p>
					</div>
				</div>
			</section>
	)
};

export default ProductObject;