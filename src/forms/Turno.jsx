import { Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment, useState } from 'react'

const Turnos = () => {
  const [inputValues, setInputValues] = useState({})

  const registrar = () => {
  console.log(inputValues);
    axios.post(`http://localhost:8080/turno`, inputValues)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data))
  }
  

  return (
    <Fragment>
      <Typography variant='h4' sx={{ marginTop: '20px' }}>{'Registrar turno'}</Typography>
      <FormGroup sx={{ width: '300px', marginTop: '20px', gap: '10px' }}>
        <FormControl>
          <InputLabel>{'Id paciente'}</InputLabel>
          <Input
            name='pacienteId'
            onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>{'Id odontologo'}</InputLabel>
          <Input
            name='odontologoId'
            onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>{'Fecha'}</InputLabel>
          <Input
            name='fecha'
            onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <Button onClick={registrar}>Registrar</Button>
      </FormGroup>
    </Fragment>
  )
}

export default Turnos