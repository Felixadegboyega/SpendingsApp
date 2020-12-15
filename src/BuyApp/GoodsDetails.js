import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./rowstyle.css"

export default function GoodsDetails(params) {

	let {instanceIndex, i} = useParams();
	let history = useHistory();

	if(localStorage.getItem("instanceArray") === null){
		localStorage.setItem("instanceArray", "");
	} 

	let instanceArray = [];	
	if(localStorage.instanceArray !== ""){
		instanceArray = JSON.parse(localStorage.getItem("instanceArray"));
	}

	let [allInst, setAllInst] = useState(instanceArray);
	let Items = allInst[instanceIndex];

	
	let CheckBeforeMounting;
	let itemObj;
	if(allInst[instanceIndex] === undefined){
		history.push("/days");
	} else if(allInst[instanceIndex].goodsArray[i] === undefined){
		history.push(`/days/${instanceIndex}`);
	} else {
		itemObj = Items.goodsArray[i]
		CheckBeforeMounting = 
		<div>
			<h5 className="card-title mt-3">{itemObj.name} Info for {Items.date}</h5> <br/>
			<div className="row">
				<div className="col-4">
					Name:<br/>
					Quantity: <br/>
					Price: <br/>
					Total: <br/>
					Status: <br/>
					When Added: <br/>
				</div>
				<div className="col-7 bold">
					{itemObj.name}<br/>
					{itemObj.quantity}<br/>
					${itemObj.price}<br/>
					${itemObj.Total}<br/>
					{itemObj.status}<br/>
					{itemObj.time}<br/>
				</div>
			</div>
		</div>
	}

	return(
		<>
			<div className="row eachrow">
				<div className="col-10 col-md-4 m-auto border rounded">
					{CheckBeforeMounting}
					<div className="">
						<Link to={`/days/${instanceIndex}`} className="btn btn-block btn-secondary mt-3 mb-3">All Items</Link>
					</div>
				</div>
			</div>
		</>
	)
};
