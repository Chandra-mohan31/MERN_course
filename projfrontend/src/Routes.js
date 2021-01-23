import React from 'react';
import {BrowserRouter ,Switch,Route} from "react-router-dom";
import Signin from "./user/Signin";
import Home from './core/Home';
import Signup from './user/Signup';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signin" exact component={Signin} />



            </Switch>
        </BrowserRouter>
    )
}

export default Routes
