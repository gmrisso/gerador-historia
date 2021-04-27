import React from 'react';

import {BrowserRouter, Switch, Route} from "react-router-dom";

import Student from "./pages/Student";
import Teacher from "./pages/Teacher";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Student} />
			<Route exact path="/teacher" component={Teacher} />			
			<Route exact path="/teacher/:id" component={Teacher}/>
		</Switch>
	</BrowserRouter>
);

export default Routes;