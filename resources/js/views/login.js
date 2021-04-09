import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { withSanctum } from 'react-sanctum';
import { Card, CardContent, Grid, TextField, FormControlLabel, Checkbox, Button, CircularProgress } from '@material-ui/core';

function Index({authenticated, signIn}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false)

    if (authenticated === true) {
        return(
            <Redirect to='/' />
        )
    } else if(authenticated === false){
        return(
            <Grid item container direction="row" justify="center" alignItems="center" xs={12}>
                <Card>
                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            signIn(email, password, remember)
                                .then(() => {})
                                .catch((error) => {});
                        }}>
                            <TextField
                                autoComplete="email"
                                fullWidth
                                id="email"
                                required
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => {setEmail(e.target.value)}}
                                autoFocus
                            />
                            <TextField
                                autoComplete="current-password"
                                id="password"
                                fullWidth
                                required
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                onChange={(e) => {setRemember(e.target.value)}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid
                xs={12}
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <CircularProgress />
            </Grid>
        )
    }
}

export default withSanctum(Index);
