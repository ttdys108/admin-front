import React from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import AuthUtils from '../utils/auth'
import {Location} from 'history'

const publicPath = new Set([
        '/login',
        '/register',
        '/resetpwd',
])

const verifyAuth = (location: Location) => {
    // if(publicPath.has(location.pathname))
    //     return true;
    return AuthUtils.isLogin();
}

const AuthRouter: React.FC<RouteProps> = ({ children, ...rest }) => {

    return (
        <Route {...rest}
            render={({location}) =>
                verifyAuth(location) ? children : (
                   <Redirect to={{pathname:"/login", state: {from: location}}}/>
                )
            }
        />
    )

}

export default AuthRouter;