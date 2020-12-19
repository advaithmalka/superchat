import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/form.scss";
import landingImg from "../assets/img/landing.jpg";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { Context } from "../context";
const SIGNUP_USER = loader("../graphql/SIGNUP_USER.gql");
const Signup = (props) => {
	const context = useContext(Context);
	const history = useHistory();
	if (context.user) {
		history.replace("/");
	}
	const slFormRef = useRef();
	useEffect(() => {
		document.title = "Signup | SuperChat";
		slFormRef.current.style.backgroundImage = `url(${landingImg})`;
	});
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
		repeatPassword: "",
	});
	const [msgs, setMsgs] = useState({
		error: "",
	});

	const handleChange = ({ target }) => {
		setInput({ ...input, [target.name]: target.value });
		if (msgs.error !== "") {
			setMsgs({
				error: "",
			});
		}
	};

	const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
		onCompleted({ signup }) {
			context.loginUser(signup);
			props.history.push("/");
		},
		onError({ graphQLErrors }) {
			setMsgs(graphQLErrors[0].extensions.exception.errors);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.password !== input.repeatPassword) {
			setMsgs({
				error: "Your passwords don't match!",
			});
		}
		signupUser({ variables: input });
	};

	return (
		<div ref={slFormRef} id="sl-form">
			<div className="container">
				<form onSubmit={handleSubmit} className="sl-form pt-3 signup">
					<h3 className="text-center fw-400 fs-35 my-3">
						Create a SuperChat
						<br /> account
					</h3>
					<div
						className="group"
						style={{ marginBottom: "0px !important" }}
					>
						<input
							name="username"
							type="text"
							required
							value={input.username}
							onChange={handleChange}
						/>
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Username</label>
					</div>
					<div
						className="group"
						style={{ marginTop: "0px !important" }}
					>
						<input
							name="email"
							type="text"
							required
							value={input.email}
							onChange={handleChange}
						/>
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Email</label>
					</div>
					<div className="group">
						<input
							name="password"
							type="password"
							required
							value={input.password}
							onChange={handleChange}
						/>
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Password</label>
					</div>
					<div className="group">
						<input
							name="repeatPassword"
							type="password"
							required
							value={input.repeatPassword}
							onChange={handleChange}
						/>
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Repeat password</label>
					</div>

					{Object.values(msgs).map((error) => (
						<p key={error} className="text-danger text-center">
							{error}
						</p>
					))}
					<div className="box">
						<button
							name="signup-submit"
							className="navbar-btn"
							type="submit"
							disabled={loading}
						>
							{!loading ? (
								"SIGN UP"
							) : (
								<div className="lit-spinner"></div>
							)}
						</button>
						<p className="mt-2">
							Already have an account?{" "}
							<Link to="/login" className="link-unstyled">
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
