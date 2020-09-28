import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from "../routes/Auth"
import Home from "../routes/Home"
import Profile from "../routes/Profile"
import Navigation from "components/Navigation"
import { Redirect } from 'react-router-dom';


const AppRouter = ({ isLoggedIn,userObj,refreshUser }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ?
                    <React.Fragment>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                        {/* <Redirect from="*" to="/" /> */}
                    </React.Fragment>
                    :
                    <div>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        {/* <Redirect from="*" to="/" /> */}
                    </div>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;