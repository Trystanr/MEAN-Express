import React, { useState } from "react";

import { useParams } from 'react-router';

function renderTableData(elem) {
	if (elem) {
		console.log(elem);
		return elem.map((slot, index) => {
			const { day, period } = slot;
			return (
				<tr key={day}>
					<td>{day}</td>
					<td>{period}</td>
				</tr>
			);
		});
	}
}

function ClassDetail() {
	let { classid } = useParams();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	if (loading) {
		setLoading(false);
		
		fetch(
			"http://localhost:8000/api/v1/class/"+classid,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {

				console.log(data);
				setData(data);
			});
	}

	return (
		<div>
			<h3>Class {classid}</h3>
			<h3>Class Name: {data.class}</h3>
			<h3>Classroom: {data.classnumber}</h3>

			<table>
				<tbody>
					<tr>
						<th>Day</th>
						<th>Period</th>
					</tr>
					{renderTableData(data.slots)}
				</tbody>
			</table>
		</div>
	);
}

export default ClassDetail;
