import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./rowstyle.css"
export default function Days(params) {

	if(localStorage.getItem("instanceArray") === null){
		localStorage.setItem("instanceArray", "");
	} 

	let instanceArray = []
	if(localStorage.instanceArray !== null && localStorage.instanceArray !== ""){
		instanceArray = JSON.parse(localStorage.getItem("instanceArray"));
	}
	let [theArr, setTheArr] = useState(instanceArray);
	let handleDelete = (i) =>{
		let newIns = theArr.filter((each, k)=>k!==i);
		localStorage.setItem("instanceArray", JSON.stringify(newIns));
		setTheArr(newIns)
	}
	return(

		<>
			
			<div className="container-fluid">
				<div className="row eachrow">
					<div className="col-11 m-auto p-0" >
						<div className="card mx-auto small" style={{maxWidth:"650px"}}>
							<h4 className="m-4 card-title">All Instances</h4>
							<div className="card-body">
								
								<table className="table table-responsive mx-auto text-center">
									<thead>
										<tr className="border border-top-0 border-right-0 border-left-0" >
											<th style={{minWidth:"100px"}}>Date</th>
											<th style={{minWidth:"100px"}}>Delete</th>
											<th style={{minWidth:"100px"}}>Amount spent</th>
											<th style={{minWidth:"100px"}}>Budget</th>
											<th style={{minWidth:"100px"}}>Budget Bal</th>
											<th style={{minWidth:"100px"}}>View</th>
										</tr>
									</thead>
									<tbody>
										{
											localStorage.instanceArray !== null && localStorage.instanceArray !== "" ?
											instanceArray.map((each, i)=>(
												<tr key={i}>
													<td>{each.date}</td>
													<td>
														<button onClick={()=>handleDelete(i)} className="btn btn-danger mt-1 fa fa-trash" title="Delete Item"></button>
													</td>
													<td>{each.amountSpent}</td>
													<td>{each.budget}</td>
													<td>{each.budgetBal}</td>
													<td>
														<Link to={`/days/${i}`} title="View" className="btn shadow-sm btn-outline-primary fa fa-eye"></Link>
													</td>
												</tr>
											)) : <tr></tr>
										}
									</tbody>
								</table>
								{
									localStorage.instanceArray === null || localStorage.instanceArray === "" ?
									<div className="text-center">
										Empty! <Link to="/newInstance">Click to Add new Instance</Link>
									</div> : ""
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
