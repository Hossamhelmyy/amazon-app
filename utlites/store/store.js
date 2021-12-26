import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import Cookies from 'js-cookie';
const initialState = {
	darkMode: Cookies.get('mode')
		? JSON.parse(Cookies.get('mode'))
		: false,

	cartItems: Cookies.get('cartItems')
		? JSON.parse(Cookies.get('cartItems'))
		: [],
	userInfo: Cookies.get('user')
		? JSON.parse(Cookies.get('user'))
		: null,

	paymentMethod: Cookies.get('paymentMethod')
		? JSON.parse(Cookies.get('paymentMethod'))
		: null,
	shippingAddress: Cookies.get('shippingAddress')
		? JSON.parse(Cookies.get('shippingAddress'))
		: {},

	id: '',
};
export const themeReducer = createSlice({
	name: 'Reudcer',
	initialState,
	reducers: {
		DarkOn(state) {
			state = {
				...state,
				darkMode: (state.darkMode = true),
			};
			// Cookies.set('Dark_Mode', JSON.stringify('on'));
		},
		DarkOff(state) {
			state = {
				...state,
				darkMode: (state.darkMode = false),
			};
			// Cookies.set('Dark_Mode', JSON.stringify('off'));
		},
		addProductToCart(state, action) {
			const value = action.payload.value;
			const product = action.payload.product;
			const exist = state.cartItems.find(
				(item) => item.name === product.name,
			);

			return produce(state, (DRAFT_STATE) => {
				if (exist && !value) {
					exist.quantity++;
				} else if (value) {
					exist.quantity = value;
				} else {
					DRAFT_STATE.cartItems.push(product);
				}
				Cookies.set(
					'cartItems',
					JSON.stringify(state.cartItems),
				);
			});
		},
		removeProductFormCart(state, action) {
			const product = action.payload;
			console.log(product);
			return produce(state, (DRAFT_STATE) => {
				const cartItems = DRAFT_STATE.cartItems.filter(
					(item) => item.name !== product.name,
				);
				DRAFT_STATE.cartItems = cartItems;
				Cookies.set(
					'cartItems',
					JSON.stringify(DRAFT_STATE.cartItems),
				);
			});
		},

		addUser(state, action) {
			const userDetails = action.payload;
			// state = {
			// 	...state,
			// 	userInfo: userDetails,
			// };
			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.userInfo = userDetails;
			});
		},
		logout(state) {
			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.userInfo = null;
				DRAFT_STATE.cartItems = [];
			});
		},
		saveShippingAdress(state, action) {
			const shipping = action.payload;
			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.shippingAddress = shipping;
			});
		},
		savePaymentMethod(state, action) {
			const payment = action.payload;

			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.paymentMethod = payment;
			});
		},
		clearCart(state) {
			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.cartItems = [];
			});
		},
		addId(state, action) {
			const id = action.payload;
			return produce(state, (DRAFT_STATE) => {
				DRAFT_STATE.id = id;
			});
		},
	},
});

export const {
	DarkOff,
	DarkOn,
	addProductToCart,
	removeProductFormCart,
	addUser,
	logout,
	saveShippingAdress,
	savePaymentMethod,
	clearCart,
	addId,
} = themeReducer.actions;
