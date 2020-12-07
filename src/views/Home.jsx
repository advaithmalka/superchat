import React, { useContext, useState, useEffect } from "react";
import "../assets/css/Home.scss";
import { Context } from "../context";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import addContact from "../assets/img/add-contact.svg";
import Tippy from "@tippyjs/react";
import AddContact from "../components/AddContact";
import "tippy.js/dist/tippy.css";
import contactImg from "../assets/img/contact.svg";
import ContactRequestIcon from "../components/ContactRequestIcon";
import Conversation from "../components/Conversation";
import ContactRequests from "../components/ContactRequests";
const QUERY_USER = loader("../graphql/QUERY_USER.gql");
const QUERY_CONTACT_REQUESTS = loader("../graphql/QUERY_CONTACT_REQUESTS.gql");

const Home = () => {
	useEffect(() => {
		document.title = "Home | SuperChat";
		const handleEsc = (e) => {
			if (e.key === "Escape") {
				setConvo(null);
			}
		};
		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);
	const { user } = useContext(Context);
	const [convo, setConvo] = useState(null);
	const { data, loading } = useQuery(QUERY_USER, {
		variables: {
			ID: user.id,
		},
	});
	const [tippyContent, setTippyContent] = useState("");
	const { data: contactReqs, refetch: refetchContactReqests } = useQuery(
		QUERY_CONTACT_REQUESTS,
		{
			onCompleted() {
				setTippyContent(
					contactReqs.queryContactRequests.length === 1
						? `You have 1 contact request`
						: contactReqs.queryContactRequests.length === 0
						? "You have no contact requests"
						: `You have ${contactReqs.queryContactRequests.length} contact requests`
				);
			},
		}
	);
	const imageSize = 60;
	const [contactModal, setContactModal] = useState(false);
	const [contactReqModal, setContactReqModal] = useState(false);

	return (
		<div id="home-container" className="container-fluid">
			<div className="row">
				<div id="contacts" className="col-lg-3 d-lg-block d-none">
					<div className="row pt-3" id="contacts-header-wrapper">
						<div className="col-2 contacts-label">
							<Tippy
								// TODO  move to variable
								content={tippyContent}
							>
								<div>
									<ContactRequestIcon
										value={
											contactReqs &&
											contactReqs.queryContactRequests
												.length
										}
										onClick={(e) =>
											setContactReqModal(true)
										}
									/>
								</div>
							</Tippy>
							{/* TODO when contact is added send a request that can be accepted or declined and resolved */}
						</div>
						<div className="col-8 text-center contacts-label">
							<h2 className="mb-3 fw-100">Contacts</h2>
						</div>
						<div className="col-2 contacts-label">
							<Tippy content="Add contact">
								<img
									src={addContact}
									onClick={() => setContactModal(true)}
									id="add-contact-img"
									className="float-right mt-2 svg-fill-white"
									alt="add contact"
									width={40}
								/>
							</Tippy>
						</div>
					</div>
					{data &&
						(data.queryUser.contacts.length === 0 ? (
							<>
								<div
									className="d-flex justify-content-center"
									style={{ marginTop: 100 }}
								>
									<img
										src={contactImg}
										alt="No contacts"
										width={125}
									/>
								</div>
								<p className="text-muted text-center mt-3">
									No contacts yet!
									<br />
									Add a new contact by clicking the plus at
									the top right corner
								</p>
							</>
						) : (
							data.queryUser.contacts.map((contact) => (
								<div
									className="row contact"
									onClick={(e) => setConvo(contact)}
									key={contact.id}
								>
									<img
										src={contact.profileImg}
										alt="profile"
										className="float-left profile-img"
										width={imageSize}
										height={imageSize}
									/>
									<p className="ml-4 mt-3 fs-20">
										{contact.username}
									</p>
								</div>
							))
						))}
				</div>
				<div id="convo" className="col-lg-9 col-12">
					<Conversation convo={convo} setConvo={setConvo} />
				</div>
			</div>
			<AddContact show={contactModal} setShow={setContactModal} />
			<ContactRequests
				show={contactReqModal}
				setShow={setContactReqModal}
				data={contactReqs && contactReqs.queryContactRequests}
				refetch={refetchContactReqests}
			/>
		</div>
	);
};

export default Home;
