import '../styles/globals.css';
import { useEffect } from 'react';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { themeReducer } from '../utlites/store/store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector(
			'#jss-server-side',
		);
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	// const loggerr = (store) => (next) => (action) => {
	// 	console.log(action);
	// 	next(action);
	// };

	const store = configureStore(
		themeReducer,
		{},
		applyMiddleware(thunk, logger),
	);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
