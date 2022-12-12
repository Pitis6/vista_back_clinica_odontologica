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
import { useState } from 'react';


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


export default function ListOdontologos() {


    const [data, setData] = useState([{}])
    const [open, setOpen] = useState(false);
    const [valor, setValor] = useState([])
    const [datosActualizados, setDatosActualizados] = useState({})

    const handleClickOpen = (e) => {
        setOpen(true);
        const dataUpdate = data.filter(item => item.id === parseInt(e.target.id))
        const entradas = Object.entries(dataUpdate[0])
        setValor(entradas)
        setDatosActualizados(dataUpdate[0]);
        
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        axios.get(`http://localhost:8080${endPoint[1]}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [open])

    const eliminar = (e) => {
        const idAEliminar = (parseInt(e.target.id));
        const datoAEliminar = data.filter(item => item.id !== parseInt(e.target.id))
        setData(datoAEliminar)
        axios.delete(`http://localhost:8080${endPoint[1]}/${idAEliminar}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.data))
    }

    const handleChange = (e) => {
        // setActualizar(!actualizar)
        // console.log(data);
        setDatosActualizados({ ...datosActualizados, [e.target.name]: e.target.value })
    }

    const actualizar = () => {
        axios.put(`http://localhost:8080${endPoint[1]}`, datosActualizados)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.data))
            setOpen(false)
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Typography variant='h4' >Lista Odontologos</Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(data && data[0]).map(item => (
                                <StyledTableCell align="center">{item}</StyledTableCell>
                            ))}
                            <StyledTableCell align="center">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(item => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell align="center">{item.id}</StyledTableCell>
                                <StyledTableCell align="center">{item.matricula}</StyledTableCell>
                                <StyledTableCell align="center">{item.nombre}</StyledTableCell>
                                <StyledTableCell align="center">{item.apellido}</StyledTableCell>
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
                    <DialogTitle>Actualizar odontologo</DialogTitle>
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
        </React.Fragment >
    );
}