import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/form.scss";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
// import bgGrad from "../assets/img/grad.png";
import { Context } from "../context";
const LOGIN_USER = loader("../graphql/LOGIN_USER.gql");
const Login = () => {
	const context = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		document.title = "Login | SuperChat";
		if (context.user) {
			history.replace("/");
		}
	});
	const [input, setInput] = useState({
		username: "",
		password: "",
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

	const [login, { loading }] = useMutation(LOGIN_USER, {
		update(cache, { data }) {
			context.loginUser(data.login);
		},
		onError({ graphQLErrors }) {
			setMsgs(graphQLErrors[0].extensions.exception.errors);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ variables: input });
	};

	return (
		<div id="sl-form">
			<div className="container">
				<form onSubmit={handleSubmit} className="sl-form pt-5">
					<h3 className="text-center fw-400 fs-35 ">
						Login to SuperChat
					</h3>
					<div className="group">
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
								"LOGIN"
							) : (
								<div className="lit-spinner"></div>
							)}
						</button>
						<p className="mt-2">
							Don't have an account?{" "}
							<Link to="/signup" className="link-unstyled">
								Sign up
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
