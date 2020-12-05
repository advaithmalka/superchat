import { useState } from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { Modal } from "react-bootstrap";

const ADD_CONTACT = loader("../graphql/ADD_CONTACT.gql");
const AddContact = (props) => {
	const [input, setInput] = useState("");
	const [error, setError] = useState("");
	const [addContact, { loading }] = useMutation(ADD_CONTACT, {
		variables: {
			username: input,
		},
		onError({ message }) {
			if (message === "Cannot read property 'username' of undefined")
				setError("User does not exist");
			else setError(message);
		},
		onCompleted() {
			props.setShow(false);
			setError("Input is required");
			setInput("");
		},
	});
	const handleSubmit = () => {
		if (input) {
			addContact();
		} else {
			setError("Input is required");
		}
	};
	return (
		<>
			<Modal
				show={props.show}
				onHide={() => {
					props.setShow(false);
					setInput("");
					setError("");
				}}
				size="md"
				className="mt-5"
				dialogClassName="addPostModal"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header>
					<h2>Add contact</h2>
				</Modal.Header>
				<Modal.Body className="pt-3">
					<label htmlFor="contact-input">Contact username</label>
					<input
						type="text"
						value={input}
						required
						onChange={(e) => {
							setInput(e.target.value);
							setError("");
						}}
						id="contact-input"
						className="form-control"
						placeholder="Usernames are case sensitive"
					/>
					<p className="text-danger text-center mt-2 mb-n1">
						{error}
					</p>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="navbar-btn mx-auto"
						onClick={handleSubmit}
					>
						{loading ? <div className="lit-spinner"></div> : "Add"}
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddContact;
