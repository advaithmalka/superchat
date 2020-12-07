import React from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const RESOLVE_CONTACT = loader("../graphql/RESOLVE_CONTACT.gql");
const ContactRequests = (props) => {
	const [resolveContact, { loading }] = useMutation(RESOLVE_CONTACT, {
		onCompleted() {
			props.refetch();
		},
	});

	return (
		<>
			<Modal
				show={props.show}
				size="lg"
				onHide={() => {
					props.setShow(false);
				}}
			>
				<Modal.Header>
					<h2>Contact requests</h2>
				</Modal.Header>
				<Modal.Body>
					<p>
						{props.data &&
							(props.data.length === 0
								? "You currently don't have any contact requests"
								: `You have ${
										props.data.length
								  } contact request${
										props.data.length !== 1 ? "s" : ""
								  } waiting to be resolved`)}
						{loading && (
							<div className="lit-spinner-black float-right"></div>
						)}
					</p>
					{props.data &&
						props.data.map((request) => (
							<div className="contact-request" key={request.id}>
								<img
									src={request.profileImg}
									alt="profile"
									className="float-left profile-img mr-2"
									style={{
										marginTop: -13,
									}}
									width={50}
									height={50}
								/>
								<p className="d-inline">{request.username}</p>
								<button
									className="btn-resolve decline float-right"
									onClick={(e) =>
										resolveContact({
											variables: {
												operation: "decline",
												contactUserID: request.id,
											},
										})
									}
								>
									Decline
								</button>
								<button
									className="btn-resolve accept float-right"
									onClick={(e) =>
										resolveContact({
											variables: {
												operation: "accept",
												contactUserID: request.id,
											},
										})
									}
								>
									Accept
								</button>
							</div>
						))}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ContactRequests;
