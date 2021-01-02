import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Landing.scss";
import landingImg from "../assets/img/landing.jpg";
import featuresContact from "../assets/img/feature-contact.png";
import featuresResolve from "../assets/img/feature-resolve.png";
import featuresChat from "../assets/img/feature-chat.png";
import previewImg from "../assets/img/preview.png";

import "../assets/css/Card.scss";
const LandingPage = () => {
	useEffect(() => {
		document.title = "SuperChat";
		document.body.classList.remove("dark-mode");
	});
	return (
		<div id="landing-page">
			<div
				id="landing-container"
				style={{
					backgroundImage: `url(${landingImg})`,
				}}
			>
				<div className="container">
					<img src={previewImg} alt="Preview of SuperChat" />
					<h1>SuperChat</h1>
					<p className="lead">The next-generation chat app.</p>
				</div>
			</div>
			<div id="landing-features">
				<div className="container">
					<h2>
						SuperChat is the most advanced chat app in the world
					</h2>
					<p className="lead mb-5">
						Forget WhatsApp, forget Google Hangouts; SuperChat has
						got your back.
					</p>

					<div className="row">
						<div className="col-lg">
							<div className="lit-card">
								<img
									src={featuresContact}
									alt="Easily add contacts"
									className="lit-card-img"
								></img>
								<div className="lit-card-body">
									<div className="lit-card-title">
										Add contacts
									</div>
									<p>
										Easily add contacts just by typing your
										friend's username.
									</p>
								</div>
							</div>
						</div>

						<div className="col-lg">
							<div className="lit-card">
								<img
									src={featuresResolve}
									alt="Easily add contacts"
									className="lit-card-img"
								></img>
								<div className="lit-card-body">
									<div className="lit-card-title">
										Resolve contacts
									</div>
									<p>
										Keep your DMs secure and keep out
										strangers by only accepting contacts you
										know, using our contact resolve system.{" "}
									</p>
								</div>
							</div>
						</div>

						<div className="col-lg">
							<div className="lit-card">
								<img
									src={featuresChat}
									alt="Easily add contacts"
									className="lit-card-img"
								></img>
								<div className="lit-card-body">
									<div className="lit-card-title">
										Chat in real time
									</div>
									{/* TODO add footnote and footer */}
									<p>
										Chat in real time† with your friends and
										family thanks to our GraphQL powered
										SuperServer™.
									</p>
								</div>
							</div>
						</div>
					</div>
					<Link to="/signup">
						<button className="navbar-btn mt-5 py-3 px-4 fs-25">
							START CHATTING
						</button>
					</Link>

					<p className="fs-10" style={{ marginTop: 80 }}>
						† You may experience some delay based on your internet
						speed and server traffic.
						<br />© SuperServer 2020 - ∞, all rights reserved.
					</p>
				</div>
			</div>
			<footer id="landing-footer">
				©{" "}
				<a
					target="_blank"
					rel="noreferrer"
					href="https://advaithmalka.github.io"
					className="text-white text-decoration-none"
				>
					Advaith Malka
				</a>{" "}
				2020 - ∞
			</footer>
		</div>
	);
};

export default LandingPage;
