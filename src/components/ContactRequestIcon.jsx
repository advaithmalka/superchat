const ContactRequestIcon = ({ onClick, width, value }) => (
	<svg
		onClick={onClick}
		width={width || 40}
		style={{ cursor: "pointer" }}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
	>
		<linearGradient
			id="4eohz1pmsXxO7RU1HFl11a"
			x1="21.516"
			x2="45.592"
			y1="17.638"
			y2="53.673"
			gradientUnits="userSpaceOnUse"
		>
			<stop offset="0" stopColor="#28afea"></stop>
			<stop offset="1" stopColor="#0b88da"></stop>
		</linearGradient>
		<path
			fill="url(#4eohz1pmsXxO7RU1HFl11a)"
			d="M9,26l36-14.308V38c0,1.105-0.895,2-2,2H9V26z"
		></path>
		<linearGradient
			id="4eohz1pmsXxO7RU1HFl11b"
			x1="1.408"
			x2="36.331"
			y1="24.41"
			y2="46.164"
			gradientUnits="userSpaceOnUse"
		>
			<stop offset="0" stopColor="#28afea"></stop>
			<stop offset="1" stopColor="#0b88da"></stop>
		</linearGradient>
		<path
			fill="url(#4eohz1pmsXxO7RU1HFl11b)"
			d="M3,11.692V38c0,1.105,0.895,2,2,2h38c0.491,0,0.935-0.184,1.283-0.478L3,11.692z"
		></path>
		<path
			d="M3,11h42v1.692l-17.32,13.45c-2.165,1.681-5.195,1.681-7.36,0L3,12.692V11z"
			opacity=".05"
		></path>
		<path
			d="M3,10.5h42v1.692L26.966,25.304c-1.762,1.304-4.17,1.304-5.932,0L3,12.192V10.5z"
			opacity=".07"
		></path>
		<path
			fill="#50e6ff"
			d="M5,8h38c1.105,0,2,0.895,2,2v1.692L26.252,24.466c-1.359,0.926-3.146,0.926-4.504,0L3,11.692V10	C3,8.895,3.895,8,5,8z"
		></path>

		<path
			fill="url(#4eohz1pmsXxO7RU1HFl11c)"
			d="M43,8H25.169C25.068,8.654,25,9.318,25,10c0,7.18,5.82,13,13,13	c2.58,0,4.978-0.761,7-2.057V10C45,8.895,44.105,8,43,8z"
			opacity=".3"
		></path>
		<linearGradient
			id="4eohz1pmsXxO7RU1HFl11d"
			x1="31.189"
			x2="45.159"
			y1="3.37"
			y2="17.34"
			gradientUnits="userSpaceOnUse"
		>
			<stop offset="0" stopColor="#f44f5a"></stop>
			<stop offset=".443" stopColor="#ee3d4a"></stop>
			<stop offset="1" stopColor="#e52030"></stop>
		</linearGradient>
		{value !== 0 && (
			<>
				<radialGradient
					id="4eohz1pmsXxO7RU1HFl11c"
					cx="37.99"
					cy="10.072"
					r="12.875"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".348"></stop>
					<stop offset=".936" stopOpacity=".098"></stop>
					<stop offset="1" stopOpacity="0"></stop>
				</radialGradient>
				<path
					fill="url(#4eohz1pmsXxO7RU1HFl11d)"
					d="M48,10.2c0,5.5-4.5,10-10,10s-10-4.5-10-10s4.5-10,10-10C43.5,0.2,48,4.6,48,10.2"
				></path>
				<text style={{ fontSize: 14 }} fill="#fff" x="34" y="15.5">
					{value}
				</text>
			</>
		)}
	</svg>
);

export default ContactRequestIcon;
