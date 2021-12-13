import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
	darkMode: false,
	cart: {
		cartItems: [],
	},
};

export const themeReducer = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		DarkOn(state) {
			state = {
				...state,
				darkMode: (state.darkMode = true),
			};
		},
		DarkOff(state) {
			state = {
				...state,
				darkMode: (state.darkMode = false),
			};
		},
		addProductToCart(state, action) {
			console.log(action.payload);
			const cartItems = [
				...state.cart.cartItems,
				state.cart.cartItems.push(action.payload),
			];
			state = {
				...state,
				cart: { ...state.cart, cartItems },
			};

			Cookies.set(
				'cartItems',
				JSON.stringify(state.cart.cartItems),
			);
		},
	},
});

export const { DarkOff, DarkOn, addProductToCart } =
	themeReducer.actions;
