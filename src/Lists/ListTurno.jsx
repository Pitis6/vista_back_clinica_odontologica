import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
// import { InterpreterMode } from '@mui/icons-material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const location = window.location.href
const endPoint = location.split('http://127.0.0.1:5173/Listar')
console.log(endPoint[1]);

export default function ListTurnos() {


    const [data, setData] = React.useState([{}])
    const [open, setOpen] = React.useState(false);
    const [valor, setValor] = React.useState([])
    const [datosActualizados, setDatosActualizados] = React.useState({})



    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (e) => {
        setOpen(true);
        const dataUpdate = data.filter(item => item.id === parseInt(e.target.id))
        const entradas = Object.entries(dataUpdate[0])
        setValor(entradas)
        setDatosActualizados(dataUpdate[0]);
        console.log(valor);
        
    };


    React.useEffect(() => {
        axios.get(`http://localhost:8080/turno`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [open])

    const eliminar = (e) => {
        const idAEliminar = (parseInt(e.target.id));
        const datoAEliminar = data.filter(item => item.id !== parseInt(e.target.id))
        setData(datoAEliminar)
        console.log(idAEliminar);
        axios.delete(`http://localhost:8080/turno/${idAEliminar}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.data))

    }

    const handleChange = (e) => {
        setDatosActualizados({ ...datosActualizados, [e.target.name]: e.target.value })
    }


    const actualizar = () => {
        axios.put(`http://localhost:8080/turno`, datosActualizados)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.data))
            setOpen(false)
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Typography variant='h4' >Lista Turnos</Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(data && data[0]).map(item => (
                                <StyledTableCell key={item} align="center">{item}</StyledTableCell>
                            ))}
                            <StyledTableCell align="center">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(item => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell align="center">{item.id}</StyledTableCell>
                                <StyledTableCell align="center">{item.fecha}</StyledTableCell>
                                <StyledTableCell align="center">{item.pacienteId}</StyledTableCell>
                                <StyledTableCell align="center">{item.odontologoId}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button id={item.id} onClick={(e) => handleClickOpen(e)}>ACTUALIZAR</Button>
                                    <Button id={item.id} onClick={(e) => eliminar(e)} >ELIMINAR</Button>
                                </StyledTableCell>
                            </StyledTableRow >
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Actualizar turno</DialogTitle>
                    <DialogContent>
                        {valor.map(elemento => (<TextField
                            autoFocus
                            margin="dense"
                            name={`${elemento[0]}`}
                            label={elemento[0]}
                            type="text"
                            fullWidth
                            defaultValue={elemento[1]}
                            variant="standard"
                            onChange={(e) => handleChange(e)}
                        />))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={actualizar}>Actualizar</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </React.Fragment>
    );
}