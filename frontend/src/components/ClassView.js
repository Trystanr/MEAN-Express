import React from "react";

import { Redirect } from 'react-router';

class ClassView extends React.Component {

	state = {
		data: [],
		loading: true,
		userID: 2,
		redirect: false,
		redirectClass: null
	};


	componentDidMount() {
		fetch("http://localhost:8000/api/v1/teacher/" + this.state.userID + "/classes", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({
					data,
					loading: false
				})
			});
	}

	renderTableHeader() {
		let header = Object.keys(this.state.data[0]);

		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>
		})
	}

	renderTableData() {
		var classClick = (id, elem) => {
			console.log(id);


				this.setState({ redirect: true, redirectClass: id });
		};

		return this.state.data.map((student, index) => {
			const { id, slot, subject, group, classroom } = student;
			return (
				<tr key={id} onClick={(e) => classClick(id, e)}>
					<td>{id}</td>
					<td>{slot}</td>
					<td>{subject}</td>
					<td>{group}</td>
					<td>{classroom}</td>
				</tr>
			);
		});
	}

	render() {
		const classItems = []

		for (let i = 0; i < this.state.data.length; i++) {
			const element = this.state.data[i].subject;
			classItems.push(element);
		}

		if (this.state.redirect && this.state.redirectClass !== null) {
			return (
				<Redirect
					
					to={{
						pathname: "/classdetail/"+this.state.redirectClass,
						state: {
							from: 5,
						},
					}}
				/>
			);
		}

		return (
			<div className="table-class">
				{this.state.loading ? (
					<div>loading</div>
				) : (
					<div>
						<h2 id="title">Teacher ID: {this.state.userID}</h2>
						<table id="students">
							<tbody>
								<tr id="table-head">{this.renderTableHeader()}</tr>
								{this.renderTableData()}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}

export default ClassView;