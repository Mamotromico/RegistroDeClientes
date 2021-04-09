import { AppBar, Button, Grid, Typography, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { withSanctum } from 'react-sanctum';

function NavBar({authenticated, signOut, user}) {

    function buttons() {
        if (authenticated === true) {
            return (
                <>
                    <Grid zeroMinWidth item>
                        <Typography align="center" variant="h6">{user.name}</Typography>
                    </Grid>
                    <Grid zeroMinWidth item>
                        <Button variant="contained"onClick={() => {signOut().then(()=>{})}}>Logout</Button>
                    </Grid>
                </>
            )
        } else {
            return (
                <div />
            )
        }
    }

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Grid container justify="space-between">
                    <Grid zeroMinWidth item xs={8}>
                        <Typography variant="h4">Client Manager</Typography>
                    </Grid>
                    <Grid spacing={2} container alignItems="stretch" justify="flex-end" item xs={4}>
                        {buttons()}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default withSanctum(NavBar);
