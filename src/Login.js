import React, { useRef } from 'react'
import { useHistory } from 'react-router';

const Login = () => {
	let history = useHistory();
	let username = useRef(null);
	let password = useRef(null);
	const handleSubmit = (e)=>{
		if(username.current.value == "Likzjoiy" && password.current.value == "likzjoiy"){
			localStorage.setItem("id", username);
			history.push("/newinstance")
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit} style={{width:"310px"}} className="rounded mt-5 p-3 mx-auto border">
				<div className="form-group">
					<label for="">Username</label>
					<input ref={username} type="text" className="form-control" placeholder="Username"/>
				</div>
				<div className="form-group">
					<label for="">Password</label>
					<input ref={password} type="password" className="form-control" placeholder="Password"/>
				</div>
				<div className="mt-4 form-group">
					<input type="submit" value="Login" className="btn btn-outline-primary btn-block" />
				</div>

			</form>
		</div>
	)
}

export default Login
