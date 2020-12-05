import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Landing.scss";

const LandingPage = () => {
	useEffect(() => {
		document.title = "SuperChat";
	});
	return (
		<div className="container">
			<div className="landing-card">
				<h1 className="text-center mt-5">SuperChat</h1>
				<p className="lead">Chat with the world</p>
				<Link to="worldchat/join">
					<button className="landing-btn">World chat</button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
