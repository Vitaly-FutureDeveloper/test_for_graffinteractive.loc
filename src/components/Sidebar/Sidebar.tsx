import React, {useEffect, useState} from "react";
import {SearchInput} from "./SearcheInput/SearchInput";
import {SelectCheckboxes} from "./SelectCheckboxes/SelectCheckboxes";
import styles from "./Sidebar.module.scss";
import {initialSidebarTC} from "../../redux/sidebar-reducer/sidebar-reducer";
import {useDispatch} from "react-redux";
import {BlockRadios} from "./BlockRadios/BlockRadios";

export const Sidebar: React.FC = () => {
	const dispatch = useDispatch<any>();

	const [width, setWidth] = useState(window.innerWidth);
	const [toggleFilters, setToggleFilters] = useState<boolean>(window.innerWidth >= 768);

	useEffect(() => {
		dispatch(initialSidebarTC());

		const handleResize = (evt:any) => {
			setWidth(evt.target.innerWidth);
		};


		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);


	const toggleSidebar = () => {
		setToggleFilters(!toggleFilters);
	};

	return <aside className={styles.sidebar}>
		<h1 className={styles.titleGen}>SpaceX Ships</h1>

		{
			(!toggleFilters && width <= 768) && <button className={styles.showFiltersMob} onClick={toggleSidebar}>Фильтры</button>
		}

		{
			(toggleFilters || width >= 768) &&

			<div className={styles.sidebarBlock}>
				<h2 className={styles.title}><span className={styles.titleRow} onClick={toggleSidebar}></span>Фильтры</h2>

				<div className={styles.searchBlock}>
					<SearchInput/>
				</div>

				<div className={styles.selectBlock}>
					<SelectCheckboxes/>
				</div>

				<div className={styles.selectBlock}>
					<BlockRadios/>
				</div>
			</div>
		}
	</aside>
};