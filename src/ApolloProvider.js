import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
	uri: "http://localhost:9090/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export default new ApolloClient({
	cache,
	link: authLink.concat(httpLink),
	name: "superchat-web-client",
});
