import React, { Fragment, useState } from 'react'
import { FormControl, FormGroup, InputLabel, FormHelperText, Input, Button, keyframes, Typography } from '@mui/material';
import axios from 'axios'

const FormOdontologo = ({ handleChange, campo, seleccion, inputValues }) => {
    const values = Object.keys(campo);
    const valuesDos = Object.keys(campo[values[0]]);
    // const filtro = inputValuesOdontologos.filter(item => Object.keys(item) == seleccion  );
    // const campos = filtro.map(item => (Object.keys(item[seleccion])) )


    const peticion = () => {

        axios.post('http://localhost:8080/turnos', inputValuesOdontologos)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const prueba = () => {
        // const filtro = inputValuesOdontologos.filter(item => Object.keys(item) == seleccion  );
        // filtro.map(item => (Object.keys(item[seleccion])) )
        //  console.log(res);
        //  console.log(filtro);
        console.log(campo);
    }

    return (
        <Fragment>
        <Typography 
        variant="h4"
        sx={{
            marginTop: '20px'
        }}
        >
            {seleccion.toUpperCase()}
        </Typography>        
        <FormGroup row={false} sx={{
            // border: 'solid 1px',
            width: '500px',
        }}>
            {
                valuesDos.map((item, index) => (
                    <FormControl key={index} margin='normal'>
                        <InputLabel htmlFor="my-input">{item}</InputLabel>
                        <Input 
                        name={item}
                        value={inputValues[item] || ""}
                        label={item}
                            id={campo[values][item]}
                            aria-describedby="my-helper-text"
                            onChange={ handleChange }
                            
                        />
                        <FormHelperText id="my-helper-text"></FormHelperText>
                    </FormControl>
                ))
            }
           <Button sx={{ color: 'green' }} >Registar {seleccion}</Button>
        </FormGroup>
        </Fragment>
    )
}

export default FormOdontologo;
