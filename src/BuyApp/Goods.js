import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./rowstyle.css"

export default function Goods(params) {
	let {instanceIndex} = useParams();
	let history = useHistory();

	let instanceArray = [];
	if(localStorage.getItem("instanceArray") === null){
		localStorage.setItem("instanceArray", "");
	} 

	if(localStorage.instanceArray !== ""){
		instanceArray = JSON.parse(localStorage.getItem("instanceArray"));
	}
	let [allInst, setAllInst] = useState(instanceArray);
	let Items = allInst[instanceIndex];
	
	let date;
	let Budget;
	let BudgetBal;
	let noOfItems;
	let noOfItemsBought;
	let noOfItemsRemaining;
	let noOfDeletedItems;

	let handleDelete =(i) =>{
		let alli = allInst.map((every, j)=>every.date === date? {...every, noOfDeletedItems:noOfDeletedItems+1, goodsArray:every.goodsArray.filter((val,k)=>k!==i)} :every);
		localStorage.setItem("instanceArray", JSON.stringify(alli));
		setAllInst(alli);
	}
	if(allInst[instanceIndex] !== undefined){
			date = allInst[instanceIndex].date;
			Budget = allInst[instanceIndex].budget;
			BudgetBal = allInst[instanceIndex].budgetBal;
	}

	if(instanceArray[instanceIndex] !== undefined){
		noOfItems = instanceArray[instanceIndex].noOfItems
		noOfItemsBought = instanceArray[instanceIndex].noOfItemsBought;
		noOfItemsRemaining = instanceArray[instanceIndex].noOfItemsRemaining;
		noOfDeletedItems = instanceArray[instanceIndex].noOfDeletedItems;
	}

	useState(()=>{
		// console.log("you change status");
		if(!allInst){
			noOfItemsBought++;
			noOfItemsRemaining--;
			console.log("you change status")
		}
			
	}, [allInst]);


	let handleChangeStatus = (i, b) =>{
		let alli = allInst.map((every, j)=>every.date === date? {
			...every,amountSpent:every.amountSpent+b,
				budgetBal:every.budgetBal-b,
				noOfItemsBought:every.noOfItemsBought+1, 
				noOfItemsRemaining:every.noOfItemsRemaining-1, 
				goodsArray:every.goodsArray.map((val,k)=>k===i ? {
					...val, status:"Bought"
				}:val)
		} :every);
		localStorage.setItem("instanceArray", JSON.stringify(alli));
		setAllInst(alli); 
	}

	return(
		<>
			<div className="container-fluid">
				<div className="row eachrow mt-3">
					<div className="col-11 col-md-5 m-auto card p-0" style={{maxWidth:"500px"}}>
						<div className="card-body">
							<h4 className="mb-3">Goods For {date}</h4><hr/>
							<div className="text-center small">
								<span className="mr-2">Total Number of Items: <b>{noOfItems}</b></span>&nbsp;
								<span className="mr-2">Number of Items Bought: <b>{noOfItemsBought}</b></span> &nbsp;
								<span className="mr-2">Number of pending Items: <b>{noOfItemsRemaining}</b></span> &nbsp;
								<span className="mr-2">Number of Deleted Items: <b>{noOfDeletedItems}</b></span> &nbsp;
								<span className="mr-2">Budget Bal: {BudgetBal > (20/100)*Budget ? <b>{BudgetBal}</b> : <b className="text-danger">{BudgetBal}</b>}</span>&nbsp; 
								<span className="mr-2">Budget: <b>{Budget}</b></span>
							</div> <hr/>
							<table className="table table-sm table-striped table-responsive">
								<thead>
									<tr>
										<th>Name</th>
										<th>Action</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{
										allInst[instanceIndex] === undefined ? history.push("/days") :
											Items.goodsArray.length === 0 ? 
											<tr className="row w-100 bg-white"><td className="text-center mx-auto col-12 w-100">There is no Item recorded to this instance, click on Add new item to add a new Item</td></tr> :
											Items.goodsArray.map((each,i)=>(
												<tr  key={i}>
													<td style={{width:"200px"}}>{each.name}</td>
													<td style={{width:"200px"}} >
														<Link to={`/days/${instanceIndex}/${i}`} className="btn shadow-sm btn-sm btn-outline-info fa fa-eye" title="View"></Link>
														<button onClick={()=>handleDelete(i)} className="btn shadow-sm btn-sm btn-outline-danger ml-2 fa fa-trash" title="Delete Item"></button>
														<Link to={`/days/${instanceIndex}/${i}/edit`} className="btn shadow-sm btn-sm btn-outline-primary ml-2 fa fa-edit" title="Edit"></Link>
													</td>
													<td style={{width:"200px"}}>{each.status} {each.status !== "Bought" ?
														<button data-toggle="modal" data-target={`#status${i}`} className="btn shadow-sm btn-sm btn-warning ml-2">Change</button> : ""}
													</td>
						
													<td id={`status${i}`} className="modal fade">
														<div className="modal-dialog modal-sm modal-dialog-centered">
															<div className="modal-content my-auto">
																<div className="modal-body">
																	<p className="small text-warning">Are you sure you want to change the status of this item. Note that you can not change the status back to pending.<br/>If your answer is yes click on Yes</p>
																</div>
																<div className="modal-footer">
																	<button className="btn shadow-sm btn-sm btn-primary">No</button>
																	<button data-dismiss="modal" onClick={()=>handleChangeStatus(i, each.Total)} className="btn shadow-sm btn-sm btn-warning ml-2">Yes</button>
																</div>
															</div>
														</div>
													</td>
												</tr>
											))
									}
								</tbody>
							</table>
							<Link to={`/days/${instanceIndex}/newitem`} className="mt-4 btn-block btn-sm mx-auto text-center shadow-sm btn-primary">Add new Item</Link>
							<Link to={`/days`} className="mt-4 btn-block btn-sm mx-auto text-center shadow-sm btn-primary">Go back to instances</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
