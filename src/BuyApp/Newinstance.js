import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./rowstyle.css"

export default function Newinstance(params) {
	let history = useHistory();
	let [info, setInfo] = useState("");
	
	let date = useRef(null);
	let budget = useRef(null);

	let instanceArray = [];

	if(localStorage.getItem("instanceArray") === null){
		localStorage.setItem("instanceArray", "");
	} 

	if(localStorage.instanceArray !== ""){
		instanceArray = JSON.parse(localStorage.getItem("instanceArray"))
	}

	// let [NewinstanceArray, setNewinstanceArray] = useState("");
	
	let saveInstance = () =>{
		if(date.current.value !== "" && budget.current.value !== ""){
			let instanceObj = {
				date:date.current.value, 
				budget:Number(budget.current.value), 
				budgetBal:Number(budget.current.value),
				amountSpent:0,
				noOfItems:0,
				noOfItemsBought:0,
				noOfItemsRemaining:0,
				noOfDeletedItems:0,
				goodsArray:[]
			}
			let current = new Date();
			let newd = date.current.value
			if (instanceArray.length > 0){
				let filtered = instanceArray.filter((each, i)=>each.date === instanceObj.date);
				if(filtered.length !== 0){
					info = "You've already added this instance";
					setInfo(info);
				} else {
					// if(Number(newd.slice(0,4)) >= current.getFullYear() && 
					// 	Number(newd.slice(5,7)) >= current.getMonth()+1 && 
					// 	Number(newd.slice(8,10)) >= current.getDate()){

						instanceArray = [...instanceArray, instanceObj] 
						localStorage.setItem("instanceArray", JSON.stringify(instanceArray));
						info = "Instance Saved, Click all instance to see saved instances"
						setInfo(info);
						date.current.value="";
						budget.current.value="";
					// } else{
					// 	info = "You can only add instance for today and next days"
					// 	setInfo(info);
					// }
				}
			} else{
				// if(Number(newd.slice(0,4)) >= current.getFullYear() && 
				// 		Number(newd.slice(5,7)) >= current.getMonth()+1 && 
				// 		Number(newd.slice(8,10)) >= current.getDate()){

						instanceArray = [...instanceArray, instanceObj] 
						localStorage.setItem("instanceArray", JSON.stringify(instanceArray));
						info = "Instance Saved, Click all instance to see saved instances"
						setInfo(info);
						date.current.value="";
						budget.current.value="";
					// } else{
					// 	info = "You can only add instance for today and next days"
					// 	setInfo(info);
					// }
			}
		} else {
			info = "Please enter all details";
			setInfo(info);
		}
	}
	const handleLogout = ()=>{
		localStorage.removeItem("id")
		history.push("/login")
	}
	return(
		<>
			 <div className="container-fluid">
				<div className="row eachrow">
					<div className="col-12">
						<button onClick={handleLogout} class="mt-3 mr-3  btn btn-dark float-right fa fa-sign-out" aria-hidden="true"></button>
					</div>
					<div style={{height:"300px"}} className="col-10 mx-auto col-md-4 card p-0">
						<div className="card-header">
							<h4 className="card-title">Add New Instance</h4>
						</div>
						<div className="card-body">
							<div className="small mb-2">{info}</div>
							<input type="date" ref={date} className="mb-3 form-control"/>
							<input type="number" ref={budget} className="form-control" placeholder="Budget"/>
						</div>
						<div className="card-footer">
							<button onClick={saveInstance} className="btn mr-3 btn-secondary">Save</button>
							<Link to="/days" className="btn mr-3 btn-info">All Instance</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
