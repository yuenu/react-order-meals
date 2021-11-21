import { useContext } from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import { CartContext } from "../../store";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const onRemoveHandler = (id) => {
		cartCtx.removeItem(id)
	};

	const onAddHandler = (item) => {
		cartCtx.addItem(item)
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={onRemoveHandler.bind(null, item.id)}
					onAdd={onAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onCloseCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onCloseCart}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={props.onCloseCart}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
