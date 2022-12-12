import React, { useState, useEffect, useMemo } from 'react'
import ResponsiveAppBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import { Odontologos } from '../forms/Odontologo';
import { Pacientes } from '../forms/Paciente';
import Turnos from '../forms/Turno';
import  ListOdontologos from '../Lists/Listodontologo';
import  ListPacientes from '../Lists/Listpaciente';
import  ListTurnos from '../Lists/ListTurno';

const FormDad = () => {

    const formMemo = useMemo(() => {
        const forms = [

            { odontologo: { matricula: "123", nombre: "", apellido: "" } },
            { paciente: { Nombre: "pacinte", apellido: "", dni: "", fecha: "", email: "", } },
            { turno: { paciente: "turno", odontologo: "", fecha: "" } }
        ]
        return forms
    }, [])
    const [seleccion, setSeleccion] = useState('paciente')
    const [inputValues, setInputValues] = useState({})
   

    // const opcion =  forms.filter(item => Object.keys(item) == seleccion )
    const [opcion, setOpcion] = useState(null)

    useEffect(() => {
        const newOpcion = formMemo.filter(item => Object.keys(item) === seleccion)
        // console.log(seleccion);
        console.log(newOpcion);
        setOpcion(newOpcion)
    
    }, [seleccion, formMemo])





    const handleSelection = (e) => {
        const selectValue = e.slice(0, (e.length - 1))
        setSeleccion(selectValue)
        console.log(selectValue);
    }

    console.log(inputValues);
    const handleChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })

    }

    const handleRender = (e) => {
        console.log(e);
        // if(e === "Registrar"){
        //     console.log("entra");
        //     return  (opcion && opcion.map((item, index) => (<FormOdontologo inputValues={inputValues} handleChange={handleChange} campo={item} key={index} seleccion={seleccion} />)))

        // }

        // if (e === "Listar"){
        //     return <Typography>hola</Typography>
        // }
        
        return <h1>{e}</h1>


    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(inputValuesOdontologos)
    //     e.target.reset();
    // }

    // const handleCleanUp = () => {
    //     setInputValuesOdontologos({ name: "", lastname: "", email: "", password: "" })
    // }

    // const childProps = {
    //     inputValuesOdontologos,
    //     setInputValuesOdontologos,
    //     handleSubmit,
    //     handleCleanUp,
    //     seleccion
    // }


    return (
        <Routes>
            <Route path='/' element={<ResponsiveAppBar setSeleccion={handleSelection} seleccion={seleccion} />}>
                <Route path='/registrar/odontologo' element={<Odontologos seleccion={seleccion} />} />
                <Route path='/registrar/paciente' element={<Pacientes seleccion={seleccion}/>} />
                <Route path='/registrar/turno' element={<Turnos seleccion={seleccion}/>} />
                <Route path='/listar/odontologo' element={<ListOdontologos />} />
                <Route path='/listar/paciente' element={<ListPacientes />} />
                <Route path='/listar/turno' element={<ListTurnos />} /> 
                {/* <Route path='/actualizar/paciente' element={<CustomizedTables />} /> */}
                {/* <Route path='/actualizar/turno' element={<CustomizedTables />} /> */}
            </Route>
            {/* <Route path='/listar/turno' element={<CustomizedTables />} /> */}
        </Routes>

        // <Fragment>
        //     <ResponsiveAppBar setSeleccion={handleSelection} handleRender={handleRender} />

        //     {render === "Registrar" ? 

        //         opcion && opcion.map((item, index) =>
        //             (<FormOdontologo inputValues={inputValues} handleChange={handleChange} campo={item} key={index} seleccion={seleccion} />))

        //     : 
        //     <Button>falso</Button>}



        // </Fragment>



    )
}

export default FormDad