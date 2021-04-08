import { List, ListItem, CircularProgress, Typography, Grid, Container, Paper } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { withSanctum } from 'react-sanctum';

function Index({authenticated}) {

    const [clients, setClients] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/clients')
            .then((response) => {
                setClients(response.data)
            })
            .catch((error) => {console.log(error)})
        return () => {

        }
    },[])

    function entryCard({name, email, cpf}){
        return (
            <ListItem component={Grid} item xs={6} key={cpf}>
                <Container>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>{email}</Typography>
                    <Typography>{cpf}</Typography>
                </Container>
            </ListItem>
        )
    }

    if (authenticated === true) {
        return(
            <Grid item xs={10}>
                <Paper >
                    <List component={Grid} container>
                        {clients.map(entryCard)}
                    </List>
                </Paper>
            </Grid>
        );
    } else if(authenticated === false) {
        return(
            <Redirect to='/login'/>
        );
    } else {
        return (<CircularProgress />)
    }
}

export default withSanctum(Index);
