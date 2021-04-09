require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'fontsource-roboto';
import { Sanctum } from "react-sanctum";

import Index from './views/client/index';
import Login from './views/login';
import NavBar from './components/navBar';
import { Grid, CssBaseline } from '@material-ui/core';

const sanctumConfig = {
    api_url: "http://localhost",
    csrf_cookie_route: "sanctum/csrf-cookie",
    signin_route: "api/login",
    signout_route: "api/logout",
    user_object_route: "api/user",
};

function App() {
    return (
        <Sanctum config={sanctumConfig}>
            <CssBaseline />
            <BrowserRouter>
                <Grid wrap='nowrap' component='span' direction='column' justify="flex-start" container style={{ minHeight: '100vh'}}>
                    <Grid item>
                        <NavBar />
                    </Grid>
                    <Grid xs={true} item container>
                        <Switch>
                            <Route exact path="/">
                                <Index />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>
            </BrowserRouter>
        </Sanctum>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
