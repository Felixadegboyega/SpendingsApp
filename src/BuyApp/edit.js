import React,{useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./rowstyle.css"

export default function Edit() {

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
	let date;
	let itemObj;
	if(allInst[instanceIndex] === undefined){
		// history.push("/days");
		window.location = "/days"
	} else if(allInst[instanceIndex].goodsArray[i] === undefined){
		// history.push(`/days/${instanceIndex}`);
		window.location = `/days/${instanceIndex}`
	} else {
		date = allInst[instanceIndex].date
		itemObj = Items.goodsArray[i]	
		CheckBeforeMounting = ""
		
	}
	let [edititemObj, setItemObj] = useState({name:itemObj.name, quantity:itemObj.quantity, price:itemObj.price});

	let handleChange = (e) =>{
		let value = e.target.value;
		let name = e.target.name;
		setItemObj({...edititemObj, [name]:value, Total:edititemObj.quantity*edititemObj.price});
	}

	let handleEdit = () =>{
		let newA = allInst.map((each, l)=>each.date === date ? {...each, goodsArray:each.goodsArray.map((val,j)=>j==i?{...val, name:edititemObj.name, quantity:edititemObj.quantity, price:edititemObj.price, Total:edititemObj.quantity*edititemObj.price}:val)}:each);
		localStorage.setItem("instanceArray", JSON.stringify(newA))
		setAllInst(newA);
		console.log(newA)

	}

	
	
	return(
		<>
			<div className="container-fluid">
				<div className="row eachrow">
					<div className="col-10 col-md-4 m-auto card p-0">
						{/* {CheckBeforeMounting} */}
						<div className="card-body">
				<h5 className="card-title mt-3">Edit {itemObj.name} Info ({date})</h5>
						<input type="text" name="name" onChange={handleChange} value={edititemObj.name} placeholder="Name" className="form-control mb-3"/>
						{/* <input type="number" name="quantity" onChange={handleChange} value={edititemObj.quantity} placeholder="Quantity" className="form-control mb-3"/>
						<input type="number" name="price" onChange={handleChange} value={edititemObj.price} placeholder="Price" className="form-control mb-3"/>
						<span>Total: {edititemObj.quantity*edititemObj.price}</span> */}
					</div>
						<div className="card-footer">
							<Link onClick={handleEdit} to={`/days/${instanceIndex}`} className="btn mr-3 btn-secondary">Save</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
