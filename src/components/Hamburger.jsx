import React, { forwardRef } from "react";
const Hamburger = forwardRef((props, ref) => {
	return (
		<span
			className="hamburger-icon m-0 scale-75 "
			id={props._id}
			ref={ref}
			style={{ cursor: "pointer" }}
		>
			<span className="bar" />
			<span className="bar" />
			<span className="bar" />
		</span>
	);
});
export default Hamburger;
