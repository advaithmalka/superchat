import { useState } from "react";
import chatImg from "../assets/img/chat.svg";
import trashImg from "../assets/img/trash.svg";
import Tippy from "@tippyjs/react";
import DeleteContact from "../components/DeleteContact";
import sendIcon from "../assets/img/send-icon.svg";
const Conversation = ({ convo, setConvo }) => {
	const [deleteContact, setDeleteContact] = useState(false);
	const [msg, setMsg] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			{convo ? (
				<>
					<div id="convo-header">
						<Tippy content="Delete contact">
							<img
								className="float-right mt-2 mr-2"
								src={trashImg}
								onClick={(e) => setDeleteContact(true)}
								style={{
									cursor: "pointer",
								}}
								alt="remove contact"
								width={25}
							/>
						</Tippy>
						<a
							href={`https://advaithm26.github.io/devmedia/users/${convo.username}`}
							title={`View ${convo.username}'s DevMedia profile`}
							id="convo-username"
							target="_blank"
							rel="noreferrer"
						>
							<h2 className="fw-200 ml-4 mb-0 mt-2 d-inline">
								{convo.username}
							</h2>
						</a>
						<DeleteContact
							show={deleteContact}
							setShow={setDeleteContact}
							id={convo.id}
							username={convo.username}
							setConvo={setConvo}
						/>
					</div>
					<form onSubmit={handleSubmit} id="input-box">
						<input
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
							type="text"
							placeholder="Send a message..."
						/>
						<button id="input-submit">
							<img
								src={sendIcon}
								alt="Send message"
								title="Send message"
							/>
						</button>
					</form>
				</>
			) : (
				<>
					<div
						className="d-flex justify-content-center"
						style={{ marginTop: 200 }}
					>
						<img src={chatImg} width={250} alt="No chats open" />
					</div>
					<p className="text-muted text-center mt-3">
						No conversations are open
						<br />
						Open a conversation by clicking on a contact
					</p>
				</>
			)}
		</>
	);
};

export default Conversation;
