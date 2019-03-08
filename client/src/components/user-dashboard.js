import React, { Component } from "react";
import Axios from "axios";
import ReportCard from "./report-card";
import { Link } from "react-router-dom";

class User extends Component {
	state = {
		reports: []
	};

	componentDidMount() {
		if (!localStorage.getItem("token")) this.props.history.push("/login");
		Axios.get("http://localhost:8080/api/reports", {
			headers: { Authorization: "Bearer " + localStorage.getItem("token") }
		})
			.then(response => {
				console.log(response.data);
				this.setState({ reports: response.data });
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="overall-div">
				<div className="centered-content-div">
					<header className="table-header">
						<div className="logo" />
					</header>
					{this.state.reports.map((report, index) => (
						<Link to={{ pathname: "/eow", state: { report } }}>
							<ReportCard key={index} report={report} />
						</Link>
					))}
				</div>
			</div>
		);
	}
}

export default User;
