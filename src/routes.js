import React from 'react';

import {BrowserRouter, Switch, Route} from "react-router-dom";

import MainSite from "./pages/MainSite";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={MainSite} />
		</Switch>
	</BrowserRouter>
);

export default Routes;