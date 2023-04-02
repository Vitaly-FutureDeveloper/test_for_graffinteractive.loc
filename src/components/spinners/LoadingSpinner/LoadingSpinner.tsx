import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner:React.FC = () => {
	return <div className={styles.lds_ellipsis}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
};

export default LoadingSpinner;