import React from 'react';
import {Toaster} from 'react-hot-toast';
import './App.scss';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import LoadingSpinner from './components/spinners/LoadingSpinner/LoadingSpinner';

const ProductList = React.lazy(() => import("./components/ProductList/ProductList"));
const ProductObject = React.lazy(() => import("./components/ProductObject/ProductObject"));

function App() {
  return (
		<BrowserRouter>
			<Provider store={store}>

				<React.Suspense fallback={<LoadingSpinner />}>

					<div className="App">
						<div className="App-wrapper">
							<main className="page-main">
								<h1 className="visually-hidden">Тестовое задание для компании GraffInteractive</h1>
									<Routes>
										<Route path='/list' element={ <ProductList /> } />
										<Route path='/object' element={ <ProductObject /> } />
										<Route path="/" element={<Navigate replace to="/list" />} />
									</Routes>
							</main>
						</div>
						<Toaster />
					</div>

				</React.Suspense>
			</Provider>
		</BrowserRouter>
  );
}

export default App;
