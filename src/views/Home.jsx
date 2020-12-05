import React, { useContext, useState } from "react";
import "../assets/css/Home.scss";
import { Context } from "../context";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import addContact from "../assets/img/add-contact.svg";
import Tippy from "@tippyjs/react";
import AddContact from "../components/AddContact";
import "tippy.js/dist/tippy.css";

const QUERY_USER = loader("../graphql/QUERY_USER.gql");
const Home = () => {
	const { user } = useContext(Context);
	const { data, loading } = useQuery(QUERY_USER, {
		variables: {
			ID: user.id,
		},
	});
	const imageSize = 70;
	const [contactModal, setContactModal] = useState(false);
	return (
		<div id="home-container" className="container-fluid">
			<div className="row">
				<div id="contacts" className="col-3">
					<Tippy content="Add contact" delay={[500, 0]}>
						<img
							src={addContact}
							onClick={() => setContactModal(true)}
							id="add-contact-img"
							className="float-right mt-2"
							alt="add contact"
							width={40}
						/>
					</Tippy>
					<div className="row justify-content-center">
						<h2>Contacts</h2>
					</div>
					{data &&
						data.queryUser.contacts.map((contact) => (
							<div className="row contact">
								<img
									src={contact.profileImg}
									alt="profile"
									className="float-left"
									width={imageSize}
									height={imageSize}
									style={{
										borderRadius: "50%",
										objectFit: "cover",
									}}
								/>
								<p className="float-right ml-5 mt-3 fs-20">
									{contact.username}
								</p>
							</div>
						))}
				</div>
				<div id="convo" className="col-9"></div>
			</div>
			<AddContact show={contactModal} setShow={setContactModal} />
			{/* TODO add delete contact and hover 3 dots */}
		</div>
	);
};

export default Home;
