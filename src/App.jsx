import "./assets/css/App.scss";
import { ApolloProvider } from "@apollo/client";
import { useContext } from "react";
import client from "./ApolloProvider";
import LandingPage from "././views/LandingPage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from "./context";
import Navbar from "./components/Navbar";
import { Context } from "./context";
import Home from "./views/Home";
function HomeRoute({ ...routeProps }) {
	const { user } = useContext(Context);
	return (
		<Route
			{...routeProps}
			render={(props) =>
				user ? <Home {...props} /> : <LandingPage {...props} />
			}
		/>
	);
}
function App() {
	return (
		<ApolloProvider client={client}>
			<ContextProvider>
				<Router basename={process.env.PUBLIC_URL}>
					<Navbar />
					<Switch>
						<HomeRoute exact path="/" />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
					</Switch>
				</Router>
			</ContextProvider>
		</ApolloProvider>
	);
}

export default App;
