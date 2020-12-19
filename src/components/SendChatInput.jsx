import { useState } from "react";

const SendChatInput = (props) => {
	const [msg, setMsg] = useState("");

	return (
		<input
			ref={props.msgInputRef}
			value={msg}
			onChange={(e) => setMsg(e.target.value)}
			type="text"
			required
			autoFocus
			placeholder="Send a message..."
		/>
	);
};

export default SendChatInput;
