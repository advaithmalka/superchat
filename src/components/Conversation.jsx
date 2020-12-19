import { useState, useCallback, useEffect, useRef } from "react";
import trashImg from "../assets/img/trash.svg";
import Tippy from "@tippyjs/react";
import DeleteContact from "../components/DeleteContact";
import sendIcon from "../assets/img/send-icon.svg";
import chevronLeft from "../assets/img/chevron-left.svg";
import statusPending from "../assets/img/status-pending.svg";
import statusDeclined from "../assets/img/status-declined.svg";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const SEND_CHAT = loader("../graphql/SEND_CHAT.gql");
const QUERY_CHATS = loader("../graphql/QUERY_CHATS.gql");
const CHAT_SUBSCRIPTION = loader("../graphql/CHAT_SUBSCRIPTION.gql");
const Conversation = ({ convo, setConvo, user }) => {
	const [deleteContact, setDeleteContact] = useState(false);
	const scroll = useCallback((node) => {
		if (node) {
			node.scrollIntoView(false);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (msgInputRef.current.value.trim()) {
			sendChat({
				variables: {
					to: convo.username,
					body: msgInputRef.current.value,
				},
			});
		}
	};
	const msgInputRef = useRef();
	const chatBoxRef = useRef();
	useEffect(() => {
		if (msgInputRef.current) msgInputRef.current.focus();
	}, [convo]);

	const { data, loading: queryLoading, refetch, subscribeToMore } = useQuery(
		QUERY_CHATS,
		{
			variables: {
				to: convo.username,
				from: user.username,
			},
		}
	);

	useEffect(() => {
		subscribeToMore({
			document: CHAT_SUBSCRIPTION,
			variables: {
				to: convo.username,
			},
			updateQuery: () => {
				refetch();
			},
		});
	}, [user]);
	const [sendChat, { loading }] = useMutation(SEND_CHAT, {
		onCompleted() {
			msgInputRef.current.value = "";
		},
	});
	let contactStatusImg;
	let contactStatus;
	if (user) {
		contactStatus = user.contacts.find(
			(contact) => contact.username === convo.username
		);

		if (contactStatus) {
			switch (contactStatus.status) {
				case "pending":
					contactStatusImg = statusPending;
					break;
				case "declined":
					contactStatusImg = statusDeclined;
					break;
				default:
					contactStatusImg = null;
			}
		}
	}

	return (
		<>
			<div id="convo-header">
				<img
					src={chevronLeft}
					alt="Back to contacts"
					title="Back to contacts"
					className="d-lg-none d-md-block"
					width={30}
					onClick={(e) => setConvo(null)}
					style={{ position: "absolute", left: 15, top: 20 }}
				/>
				<a
					href={`https://advaithm26.github.io/devmedia/users/${convo.username}`}
					title={`View ${convo.username}'s DevMedia profile`}
					id="convo-username"
					target="_blank"
					rel="noreferrer"
				>
					<h2
						id="convo-username"
						className="fw-200 ml-4 mb-0 mt-2 d-inline"
					>
						{convo.username}
					</h2>
				</a>

				<Tippy content="Delete contact">
					<img
						className="mt-2 mr-2 icon float-right"
						src={trashImg}
						onClick={(e) => setDeleteContact(true)}
						alt="remove contact"
						width={25}
					/>
				</Tippy>
				{contactStatus && contactStatus.status !== "accepted" && (
					<Tippy
						content={
							contactStatus.status === "pending"
								? "This contact has not accepted your request yet"
								: contactStatus.status === "declined" &&
								  "This contact declined your contact request"
						}
					>
						<img
							src={contactStatusImg}
							width={
								contactStatus.status === "declined" ? 28 : 10
							}
							className={
								contactStatus.status === "declined"
									? "float-right mr-3 mt-2"
									: "float-right mr-3 mt-3"
							}
							alt="This contact has not accepted your request yet"
						/>
					</Tippy>
				)}

				<DeleteContact
					show={deleteContact}
					setShow={setDeleteContact}
					id={convo.id}
					username={convo.username}
					setConvo={setConvo}
				/>
			</div>
			<div id="chat-box" ref={chatBoxRef}>
				{data &&
					data.queryChats.map((chat, idx) => {
						const newMsg = data.queryChats.length - 1 === idx;

						return (
							<div
								key={chat.id}
								className="chat"
								ref={newMsg ? scroll : null}
							>
								<div
									className={
										chat.from === user.username
											? "user-chat"
											: "contact-chat"
									}
								>
									<div className="chat-body">{chat.body}</div>
								</div>
							</div>
						);
					})}
			</div>
			<form onSubmit={handleSubmit} id="input-box">
				<input
					ref={msgInputRef}
					type="text"
					required
					autoFocus
					placeholder="Send a message..."
				/>
				<button id="input-submit">
					{loading || queryLoading ? (
						<div className="lit-spinner mx-auto"></div>
					) : (
						<img
							src={sendIcon}
							alt="Send message"
							title="Send message"
						/>
					)}
				</button>
			</form>
		</>
	);
};

export default Conversation;
