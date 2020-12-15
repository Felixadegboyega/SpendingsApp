import React from 'react';
import { Link } from 'react-router-dom';
import "./rowstyle.css"

export default function GoodsIndex(params) {
	return(
		<>
			<div className="container-fluid">
				<div className="row eachrow">
					<div className="col-12 col-md-5 m-auto border shadow-sm rounded p-5" style={{height:"250px", maxWidth:"300px"}}>
						<Link to="/newinstance" className="btn btn-block btn-primary mb-3">Create New</Link>
						<Link to="/days" className="btn btn-block btn-secondary mb-3">View</Link>
						<Link to="/login" className="btn btn-block btn-secondary mb-3">Login</Link>
					</div>
				</div>
			</div>	
		</>
	)
};
