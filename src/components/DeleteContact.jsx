import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { Modal } from "react-bootstrap";
const DELETE_CONTACT = loader("../graphql/DELETE_CONTACT.gql");
const AddContact = (props) => {
	const [deleteContact, { loading }] = useMutation(DELETE_CONTACT, {
		variables: {
			contactID: props.id,
		},
		onCompleted() {
			props.setConvo(null);
			props.setShow(false);
		},
	});

	return (
		<>
			<Modal
				show={props.show}
				onHide={() => {
					props.setShow(false);
				}}
				size="md"
				className="mt-5"
				dialogClassName="addPostModal"
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header>
					<h2>Delete contact</h2>
				</Modal.Header>
				<Modal.Body className="pt-3">
					<p>
						Are you sure you want to remove {props.username} as a
						contact?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="navbar-btn navbar-btn-outline mx-2"
						onClick={(e) => props.setShow(false)}
					>
						No
					</button>
					<button
						className="navbar-btn mx-2"
						onClick={(e) => deleteContact()}
					>
						{loading ? <div className="lit-spinner"></div> : "Yes"}
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddContact;
