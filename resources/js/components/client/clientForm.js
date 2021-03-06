import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { cpfMask } from '../../util/cpfMask';

function ClientForm({clientData, refreshList, onSubmitEvent}) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [id, setId] = React.useState(null);

    const handleSubmit = (event, name, email, cpf, id) => {
        event.preventDefault()
        if(id) {
            axios.put('/api/clients/'+id, {'name': name, 'email': email, 'cpf': cpf.replace(/[^\d]/g, '')})
                .then((response) => {
                    console.log()
                    refreshList()
                    setName('');
                    setEmail('');
                    setCpf('');
                    setId(null)
                    onSubmitEvent();
                })
                .catch((error) => {console.log(error)})
        } else {
            axios.post('/api/clients', {'name': name, 'email': email, 'cpf': cpf.replace(/[^\d]/g, '')})
                .then((response) => {
                    console.log()
                    refreshList()
                    setName('');
                    setEmail('');
                    setCpf('');
                    onSubmitEvent();
                })
                .catch((error) => {console.log(error)})
        }
    }

    React.useEffect(() => {
        if(!_.isEmpty(clientData)) {
            setName(clientData.name)
            setEmail(clientData.email)
            setCpf(cpfMask(clientData.cpf))
            setId(clientData.id)
        }
    },[])

    return (
        <form onSubmit={(e) => {handleSubmit(e, name, email, cpf, id)}}>
            <TextField
                fullWidth
                id="name"
                required
                value={name}
                label="Name"
                variant="outlined"
                margin="normal"
                onChange={(e) => {setName(e.target.value)}}
                autoFocus
            />
            <TextField
                fullWidth
                id="email"
                required
                value={email}
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <TextField
                fullWidth
                id="cpf"
                required
                value={cpf}
                label="CPF"
                variant="outlined"
                margin="normal"
                onChange={(e) => {setCpf(cpfMask(e.target.value))}}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );
}

export default ClientForm;
