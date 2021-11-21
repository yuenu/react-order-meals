import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import CartIcon from "../Cart/CartIcon";
import mealImage from "../../assets/meals.jpeg";
import { CartContext } from "../../store";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
	const cartCtx = useContext(CartContext);
  const { items } = cartCtx
	const NumberOfCartItem = items.reduce((currNumber, item) => {
		return currNumber + item.amount;
	}, 0);


  useEffect(() => {
    if(items.length === 0) return;
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

	return (
		<button
			className={`${classes.button} ${btnIsHighlighted ? classes.bump : ''}`}
			onClick={props.onClick}
		>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{NumberOfCartItem}</span>
		</button>
	);
};

const Header = (props) => {
	return (
		<>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealImage} alt="" />
			</div>
		</>
	);
};

export default Header;
