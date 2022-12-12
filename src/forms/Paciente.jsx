import { Box, Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment, useState } from 'react'

export const Pacientes = () => {

  const [inputValues, setInputValues] = useState({ domicilio: { calle: "", numero: "", localidad: "", provincia: "" } })


  const registrar = () => {
    axios.post(`http://localhost:8080/paciente`, inputValues)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data))
  }


  return (
    <Fragment>
      <Typography variant='h4' sx={{ marginTop: '20px' }}>{'Registrar paciente'}</Typography>
      <Box component='div' sx={{ display: 'flex', gap: '1rem' }}>
        <FormGroup sx={{ width: '300px', marginTop: '20px', gap: '10px' }}>
          <FormControl>
            <InputLabel>{'Nombre'}</InputLabel>
            <Input
              name='nombre'
              onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Apellido'}</InputLabel>
            <Input
              name='apellido'
              onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Cedula'}</InputLabel>
            <Input
              name='dni'
              onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Fecha'}</InputLabel>
            <Input
              name='fechaIngreso'
              onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Email'}</InputLabel>
            <Input
              name='email'
              onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        </FormGroup>
        <FormGroup sx={{ width: '300px', marginTop: '20px', gap: '10px' }}>
          <FormControl>
            <InputLabel>{'Calle'}</InputLabel>
            <Input
              name='calle'
              onChange={(e) => setInputValues({ ...inputValues, domicilio: { ...inputValues.domicilio, [e.target.name]: e.target.value } })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Numero'}</InputLabel>
            <Input
              name='numero'
              onChange={(e) => setInputValues({ ...inputValues, domicilio: { ...inputValues.domicilio, [e.target.name]: e.target.value } })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'localidad'}</InputLabel>
            <Input
              name='localidad'
              onChange={(e) => setInputValues({ ...inputValues, domicilio: { ...inputValues.domicilio, [e.target.name]: e.target.value } })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>{'Provincia'}</InputLabel>
            <Input
              name='provincia'
              onChange={(e) => setInputValues({ ...inputValues, domicilio: { ...inputValues.domicilio, [e.target.name]: e.target.value } })}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <Button onClick={registrar} sx={{marginTop: '1rem'}}>Registrar</Button>
        </FormGroup>
      </Box>

    </Fragment>
  )
}
