import React from "react";
import {BrowserRouter as Router, Switch, Route, BrowserRouterProps} from "react-router-dom";
import Login from "../pages/login";
import AuthRouter from "./AuthRouter";
import AppLayout from "../pages/layout";
import Home from "../pages/home";


const AppRouter = () => {


    return (
        <Router>
            <Switch>
                <Route path={'/login'}>
                    <Login />
                </Route>
                <AuthRouter path={'/'}>
                    <AppLayout>
                        <Route path={'/'} exact>
                            <Home />
                        </Route>

                    </AppLayout>
                </AuthRouter>
            </Switch>

        </Router>
    )
}

export default AppRouter;