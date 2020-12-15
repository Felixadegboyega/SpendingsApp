import React, { useState } from 'react'
import { Redirect, Route } from 'react-router'

const NewInstanceGuard = ({component:Component, auth}) => {
	const [username, setUsername] = useState(localStorage.id)
	return (
		<div>
			<Route render={()=>{
				return username != undefined ? <Component/> : <Redirect to="/login" />
			}} />
		</div>
	)
}

export default NewInstanceGuard
