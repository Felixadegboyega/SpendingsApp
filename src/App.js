import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GoodsIndex from './BuyApp';
import Days from './BuyApp/Days';
import Edit from './BuyApp/edit';
import Goods from './BuyApp/Goods';
import GoodsDetails from './BuyApp/GoodsDetails';
import Newinstance from './BuyApp/Newinstance';
import Newmarket from './BuyApp/Newmarket';
import Error from './Error';
import Login from './Login';
import Navbar from './Navbar';
import NewInstanceGuard from './NewInstanceGuard';

export default function App(params) {
	return(
		<>
			<Router>
				<Navbar/>
				<Switch>
					<Route exact path="/">
						<GoodsIndex/>
					</Route>
					<Route exact path="/marketapp">
						<GoodsIndex/>
					</Route>

					{/* <NewInstanceGuard path="/newinstance" component={Newinstance}/> */}

					{/* <Route exact path="/login">
						<Login/>
					</Route> */}
						
					<Route exact path="/newinstance">
						<Newinstance/>
					</Route>

					<Route exact path="/days">
						<Days/>
					</Route>

					<Route exact path="/days/:instanceIndex" children={<Goods/>}></Route>
					<Route exact path="/days/:instanceIndex/newitem" children={<Newmarket/>}></Route>

					<Route exact path="/days/:instanceIndex/:i" children={<GoodsDetails/>}></Route>
					<Route exact path="/days/:instanceIndex/:i/edit" children={<Edit/>}></Route>

					<Route path="*">
						<Error/>
					</Route>
				</Switch>
			</Router>
		</>
	)
};
