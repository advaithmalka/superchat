import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
const cache = new InMemoryCache();
const httpLink = createHttpLink({
	uri: process.env.REACT_APP_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const wsLink = new WebSocketLink({
	uri: process.env.REACT_APP_WEBSOCKET_ENDPOINT,
	options: {
		reconnect: true,
		connectionParams: {
			authToken: localStorage.getItem("token"),
		},
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

export default new ApolloClient({
	cache,
	link: splitLink,
	name: "superchat-web-client",
});
