import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './Paginator.module.scss';
import {initialProductsListTC} from "../../../redux/list-reducer/list-reducer";
import {getCurrentCategory} from "../../../redux/sidebar-reducer/sidebar-selectors";
import {getTotalItemsCount} from "../../../redux/list-reducer/list-selectors";


type PropsType = {
};
const Paginator:React.FC<PropsType> = () => {
	const dispatch = useDispatch<any>();
	const [currentPage, setCurrentPage] = useState(1);

	const currentCategory = useSelector(getCurrentCategory);
	const totalItemsCount = useSelector(getTotalItemsCount);

	useEffect(() => {
		setCurrentPage(1);
	}, [currentCategory]);

	const portionCount = Math.ceil(totalItemsCount / 4);

	const onChangePage = (page:number) => {
		if(page === -1 && currentPage === 1){
			return;
		}

		if(currentPage + page <= portionCount){
			setCurrentPage(currentPage + page);
			dispatch(initialProductsListTC(currentPage + page));
		}
	};


	return (
		<div className={style.pagination}>

			<button className={style.paginationBtn + ' ' + style.paginationBtn__prev}
							onClick={() => onChangePage(-1)}
							 >
			</button>

			<span>{currentPage}</span>

			<button className={style.paginationBtn + ' ' + style.paginationBtn__next}
							onClick={() => onChangePage(1)}
							 >
			</button>

		</div>
	);

};

export default Paginator;