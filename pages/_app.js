import '../styles/globals.css';
import '../styles/btn.scss';

import { useEffect, useRef } from 'react';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { themeReducer } from '../utlites/store/store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore(
	themeReducer,
	{},
	applyMiddleware(thunk, logger),
);
function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector(
			'#jss-server-side',
		);
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
