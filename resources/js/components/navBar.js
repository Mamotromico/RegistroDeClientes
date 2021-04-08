import { AppBar, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link, Router } from 'react-router-dom';
import { withSanctum } from 'react-sanctum';

function NavBar({authenticated, signOut, user}) {

    function buttons() {
        if (authenticated === true) {
            return (
                <>
                    <Typography variant="h2">{user.name}</Typography>
                    <Button color="inherit" onClick={() => {signOut().then(()=>{})}}>Logout</Button>
                </>
            )
        } else {
            return (
                <Button component={Link} to="/login" color="inherit">Login</Button>
            )
        }
    }

    return (
        <AppBar position="sticky">
            <Typography variant="h6">Client Manager</Typography>
            {buttons()}
        </AppBar>
    )
}

export default withSanctum(NavBar);
