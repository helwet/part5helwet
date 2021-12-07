import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Toggleable = (props) => {
	var show = false;
	if (typeof props.showAtStart !== "undefined" && props.showAtStart)
		show = true;
	const [visible, setVisible] = useState(show);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};
	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.hideName}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>
					{
						props.showName
						/*() => {
						return props.hideName;
					}*/
					}
				</button>
			</div>
		</div>
	);
};

Toggleable.displayName = "Toggleable";
Toggleable.propTypes = {
	showName: PropTypes.string.isRequired,
	hideName: PropTypes.string.isRequired,
	onShow: PropTypes.func,
	onHide: PropTypes.func,
	showAtStart: PropTypes.bool
};

export default Toggleable;
