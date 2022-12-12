import { Button, FormControl, FormGroup, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment, useState } from 'react'

export const Odontologos = () => {

  const [inputValues, setInputValues] = useState({})
  

  const registrar = () => {
    axios.post(`http://localhost:8080/odontologo`, inputValues)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data))
  }

  // const handleClose =()=>{

  // }

  return (
    <Fragment>
      <Typography variant='h4' sx={{ marginTop: '20px' }}>{'Registrar odontologo'}</Typography>
      <FormGroup sx={{ width: '300px', marginTop: '20px', gap: '10px' }}>
        <FormControl>
          <InputLabel>{'Matricula'}</InputLabel>
          <Input
            name='matricula'
            onChange={(e) => setInputValues({ ...inputValues, [e.target.name]: e.target.value })}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
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
        <Button onClick={registrar}>Registrar</Button>
      </FormGroup>
    </Fragment>
  )
}

