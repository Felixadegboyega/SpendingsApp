import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import "./rowstyle.css"

export default function Newmarket() {
	let history = useHistory();

	if(localStorage.getItem("instanceArray") === null){
		localStorage.setItem("instanceArray", "");
	} 

	let {instanceIndex} = useParams();
	let [info, setInfo] = useState("")
	let getIns =[];
	let date;
	if(localStorage.instanceArray != ""){
		getIns = JSON.parse(localStorage.getItem("instanceArray"));
		// let gets = getIns.filter((each,i)=>i=== instanceIndex);
		if(getIns[instanceIndex] === undefined){
			history.push('/days');
		} else{
			date = getIns[instanceIndex].date
		}
	} else{
		history.push('/newInstance');
	}
	
	let [itemObj, setItemObj] = useState({name:"", quantity:"", price:"", status:"Pending"});
	
	let [thein, setThein] = useState(getIns);

	let handleChange = (e) =>{
		let value = e.target.value;
		let name = e.target.name;
		setItemObj({...itemObj, [name]:value, Total:itemObj.quantity*itemObj.price});
	}
	
	let addItem = () =>{
		if(itemObj.name !== "" && itemObj.quantity !== "" && itemObj.price){
			let instance = thein.map((each,i)=>each.date === date ?{
				...each, noOfItems:each.noOfItems+1, noOfItemsRemaining:each.noOfItemsRemaining+1, goodsArray:[...each.goodsArray, {...itemObj, Total:itemObj.quantity*itemObj.price, time:new Date().getHours() + ":" + new Date().getMinutes()}]
			}:each);
			setThein(instance);
			localStorage.setItem("instanceArray", JSON.stringify(instance));
			setInfo("Item Successfully Added");
			setItemObj({name:"", quantity:"", price:"", status:"pending"});
			
		} else{
			setInfo("Please enter all neccessary information");
		}
	}

	return(
		<>
			<div className="container-fluid">
				<div className="row eachrow">
					<div className="col-10 col-md-4 m-auto card p-0">
						<div className="card-header">
							<h4 className="card-title">Add New for {date}</h4>
						</div>
						<div className="card-body">
							<div className="small mb-3">{info}</div>
							<input type="text" name="name" onChange={handleChange} value={itemObj.name} placeholder="Name" className="form-control mb-3"/>
							<input type="number" name="quantity" onChange={handleChange} value={itemObj.quantity} placeholder="Quantity" className="form-control mb-3"/>
							<input type="number" name="price" onChange={handleChange} value={itemObj.price} placeholder="Price" className="form-control mb-3"/>
							<span>Total: {itemObj.quantity*itemObj.price}</span>
						</div>
						<div className="card-footer">
							<button className="btn mr-3 btn-primary" onClick={addItem}>Add</button>
							<Link to={`/days/${instanceIndex}`} className="btn mr-3 btn-secondary">View</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
