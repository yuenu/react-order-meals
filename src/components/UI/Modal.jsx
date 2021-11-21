import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlays = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const Modal = (props) => {
	const protalElement = document.getElementById("overlays");
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, protalElement)}
			{ReactDOM.createPortal(
				<ModalOverlays>{props.children}</ModalOverlays>,
				protalElement
			)}
		</>
	);
};

export default Modal;
