import React, { useEffect, useState } from 'react'
import ClienteServices from '../services/ClienteServices';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddClienteComponent = () => {
  
    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
      
    const saveOrUpdateCliente = (e) => {
        e.preventDefault();
        const cliente = {nombre, apellido,email};
        if(id){
            ClienteServices.updateCliente(id,cliente).then((response) =>{
            console.log(response.data);
            navigate('/clientes');

        }).catch(error =>{
            console.log(error)
        })
      }
      else{
            ClienteServices.createCLiente(cliente).then((response) =>{
            console.log(response.data);
            navigate('/clientes');

        }).catch(error =>{
            console.log(error)
        })




      }
    }    

    useEffect(() => {
        ClienteServices.getClienteById(id).then((response) => {
            setNombre(response.data.nombre);    
            setApellido(response.data.apellido);
            setEmail(response.data.email)

        }).catch(error => {
            console.log(error);
        })

    },[id])

    const title = () => {
        if(id){
            return <h2 className='text-center'>ACtualizar cliente </h2>;
            
        }else {
            return <h2 className='text-center'>Agregar cliente </h2>;
        }


    }


  
    return (
    <div>
      <div className='container'>
        <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'> 
                {
                    title()
                }
            </h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-s'>
                        <label className='form-label'>Nombre</label>
                        <input 
                            type='text'
                            placeholder='Digite su nombre'
                            name='nombre'
                            className='form-control'
                            value={ nombre }
                            onChange={(e)=> setNombre(e.target.value)}
                        />

                    </div>
                    <div className='form-group mb-s'>
                        <label className='form-label'>Apellido</label>
                        <input 
                            type='text'
                            placeholder='Digite su Apellido'
                            name='apellido'
                            className='form-control'
                            value={ apellido }
                            onChange={(e)=> setApellido(e.target.value)}
                        />

                    </div>
                    <div className='form-group mb-s'>
                        <label className='form-label'>Email</label>
                        <input 
                            type='text'
                            placeholder='Digite su Email'
                            name='email'
                            className='form-control'
                            value={ email }
                            onChange={(e)=> setEmail(e.target.value)}
                        />

                    </div>
                    <button className='btn btn-success' onClick={ (e) => saveOrUpdateCliente(e)}>Guardar</button>
                    &nbsp;&nbsp;
                    <Link to ='/clientes' className='btn btn-danger'>Cancelar</Link>
                </form>

            </div>

        </div>

        </div>

      </div>


    </div>
  )
}

export default AddClienteComponent
