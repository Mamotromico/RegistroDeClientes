import {
    List, ListItem, CircularProgress, Typography,
    Grid, Card, CardContent, CardHeader, styled,
    CardActions, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, Tooltip, Fab, Paper
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { withSanctum } from 'react-sanctum';
import ClientForm from '../../components/client/clientForm';
import { cpfMask } from '../../util/cpfMask';

function Index({authenticated}) {

    const [clients, setClients] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [client, setClient] = React.useState(null);

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
            <ListItem component={Grid} item xs={12} md={6} lg={4} key={id}>
                <Card component={Grid} spacing={1} container direction="column">
                    <Typography noWrap component={Grid} item align='center' variant='h6'>{name}</Typography>
                    <Typography noWrap style={{paddingLeft: '1em'}} component={Grid} item>{email}</Typography>
                    <Typography noWrap style={{paddingLeft: '1em'}} component={Grid} item>{cpfMask(cpf)}</Typography>
                    <Grid container item>
                        <Tooltip title="Delete" aria-label="delete">
                            <IconButton onClick={(e) => {deleteClient(id)}}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" aria-label="edit">
                            <IconButton onClick={() => {setClient({'name': name, 'email': email, 'cpf': cpf, 'id': id}); setShowForm(true)}}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Card>
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
                <Dialog open={showForm} onClose={() => {setShowForm(false); setClient(null)}}>
                    <DialogContent>
                        <ClientForm clientData={client} refreshList={requestList} onSubmitEvent={() => {setClient(null); setShowForm(false)}} />
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
                <List component={Grid} item xs={10} spacing={4} container >
                    {clients.map(entryCard)}
                </List>
                <Fab
                    color="primary"
                    variant="extended"
                    onClick={() => {setShowForm(true)}}
                    style={{
                        margin: 0,
                        top: 'auto',
                        right: 20,
                        bottom: 20,
                        left: 'auto',
                        position: 'fixed'
                    }}
                >
                        <Add />
                        Add Client
                </Fab>
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
