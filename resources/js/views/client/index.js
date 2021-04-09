import {
    List, ListItem, CircularProgress, Typography,
    Grid, Card, CardContent, CardHeader, styled,
    CardActions, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, Tooltip, Fab
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { withSanctum } from 'react-sanctum';
import ClientForm from '../../components/client/clientForm';
import { cpfMask } from '../../util/cpfMask';

const ClientCard = styled(Card)({
    width: '100%',
    height: '100%',
});

const ClientActions = styled(CardActions)({
    marginTop: 'auto'
});

function Index({authenticated}) {

    const [clients, setClients] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [client, setClient] = React.useState({});

    const requestList = () => {
        axios.get('/api/clients')
            .then((response) => {
                setClients(response.data)
            })
            .catch((error) => {console.log(error)})
    }

    const deleteClient = (id) => {
        axios.post('/api/clients/'+id+'/delete')
            .then((reponse) => {
                requestList()
            })
            .catch((error) => {console.log(error)})
    }

    React.useEffect(() => {
        axios.get('/api/clients')
            .then((response) => {
                setClients(response.data)
            })
            .catch((error) => {console.log(error)})
        return () => {

        }
    },[])

    const entryCard = ({name, email, cpf, id}) => {
        return (
            <ListItem component={Grid} item xs={4} key={id}>
                <ClientCard>
                    <CardHeader title={name} />
                    <CardContent>
                        <Typography>{email}</Typography>
                        <Typography>{cpfMask(cpf)}</Typography>
                    </CardContent>
                    <ClientActions>
                        <Tooltip title="Delete" aria-label="delete">
                            <IconButton onClick={(e) => {deleteClient(id)}}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" aria-label="edit">
                            <IconButton>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </ClientActions>
                </ClientCard>
            </ListItem>
        )
    }

    if (authenticated === true) {
        return(
            <Grid
                item
                container
                direction="row"
                justify="center"
            >
                <Dialog open={showForm} onClose={() => {setShowForm(false)}} aria-labelledby="form-title">
                    <DialogTitle id="form-title">Register a new Client</DialogTitle>
                    <DialogContent>
                        <ClientForm clientData={client} refreshList={requestList} onSubmitEvent={() => {setShowForm(false)}} />
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
                <Grid spacing={2} container direction="column" justify="space-around" alignItems="center" item>
                    <List component={Grid} container justify='center'>
                        <Grid item container xs={10}>
                            {clients.map(entryCard)}
                        </Grid>
                    </List>
                    <Fab
                        component={Grid}
                        color="primary"
                        variant="extended"
                        onClick={() => {setShowForm(true)}}
                    >
                        <Add />
                        Add Client
                    </Fab>
                </Grid>
            </Grid>
        );
    } else if(authenticated === false) {
        return(
            <Redirect to='/login'/>
        );
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
