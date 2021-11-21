import React, { useReducer } from "react";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const existingCardItemsIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCardItem = state.items[existingCardItemsIndex];
		let updatedItems;

		if (existingCardItem) {
			const updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCardItemsIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const existingCardItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingCardItem = state.items[existingCardItemIndex];

		const updatedTotalAmount = state.totalAmount - existingCardItem.price;
		let updatedItems;
		if (existingCardItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCardItem,
				amount: existingCardItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCardItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

export const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
});

export const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContextValue = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContextValue}>
			{props.children}
		</CartContext.Provider>
	);
};
