import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(params) {
	return(
		<>
			<nav className="navbar navbar-expand-md navbar-white shadow bg-white sticky-top">
				<Link className="navbar-brand" to="/">ROUTER CLASS</Link>
				<button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div id="my-nav" className="collapse navbar-collapse">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>
						{/* <li className="nav-item">
							<Link className="nav-link" to="/effect">New Instance</Link>
						</li> */}
						{/* <li className="nav-item">
							<Link className="nav-link" to="/About">About Us</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/users">Form</Link>
						</li> */}
					</ul>
				</div>
			</nav>
		</>
	)
};
