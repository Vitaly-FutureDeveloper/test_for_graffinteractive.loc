import React, {useEffect} from "react";
import styles from "./ProductList.module.scss";
import {Sidebar} from "../Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {getProductList, getProductListInitialized} from "../../redux/list-reducer/list-selectors";
import Product from "./Product/Product";
import {initialProductsListTC} from "../../redux/list-reducer/list-reducer";
import Paginator from "./Paginator/Paginator";

export const ProductList:React.FC = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(initialProductsListTC());
	}, []);

	const productList = useSelector(getProductList);
	const initialized = useSelector(getProductListInitialized);

	return <section className={styles.productListPage}>
		<Sidebar />
		<div className={styles.productList_block}>
			<h1 className={styles.title}>SpaceX Ships</h1>
			<ul className={styles.productList}>
				{
					initialized

					&&

					productList.map((product) => <Product key={product.id}
																								id={product.id}
																								title={product.title}
																								category={product.category}
																								brand={product.brand} />)
				}
			</ul>

			<div>
				<Paginator />
			</div>
		</div>


	</section>
};

export default React.memo(ProductList);