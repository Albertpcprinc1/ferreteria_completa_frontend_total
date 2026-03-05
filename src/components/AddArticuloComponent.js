import React, { useEffect, useState } from 'react'
import ClienteServices from '../services/ClienteServices';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticulosServices from '../services/ArticulosServices';

const AddArticuloComponent = () => {
  
    const [nombrearticulo, setNombre] = useState('');
    const [precio, setPrecio] = useState('');      // Cambiado de apellido
    const [existencia, setExistencia] = useState(''); // Cambiado de email
    const navigate = useNavigate();
    const { id } = useParams();
      
    const saveOrUpdateCliente = (e) => {
    e.preventDefault();
    
    const articuloData = {
        nombrearticulo, 
        precio: precio === '' ? 0 : Number(precio),
        existencia: existencia === '' ? 0 : parseInt(existencia, 10)
    };

    // Imprime esto en consola para ver si el servicio existe antes de llamar a la función
    console.log("Servicio:", ArticulosServices);

    if(id){
        ArticulosServices.updateCliente(id, articuloData)
            .then(() => navigate('/articulos'))
            .catch(err => console.error("Error Update:", err));
    } else {
        // Usamos el nombre exacto de tu archivo Service: createCliente
        if (typeof ArticulosServices.createCliente === 'function') {
            ArticulosServices.createCliente(articuloData)
                .then(() => navigate('/articulos'))
                .catch(err => console.error("Error Create:", err));
        } else {
            console.error("¡La función createCliente no existe en el servicio!");
        }
    }
}    

    useEffect(() => {
        // Solo intentamos cargar si existe un ID
        if(id) {
            ArticulosServices.getClienteById(id).then((response) => {
                setNombre(response.data.nombrearticulo);    
                setPrecio(response.data.precio);     // Mapeo de la API al nuevo estado
                setExistencia(response.data.existencia);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id]) // Agregamos 'id' como dependencia por buena práctica

    const title = () => {
        return id ? <h2 className='text-center'>Actualizar Artículo</h2> : <h2 className='text-center'>Agregar Artículo</h2>;
    }

    return (
    <div>
      <div className='container'>
        <div className='row'>
        <div className='card col-md-6 offset-md-3'>
            { title() }
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Nombre</label>
                        <input 
                            type='text'
                            placeholder='Nombre del artículo'
                            className='form-control'
                            value={ nombrearticulo }
                            onChange={(e)=> setNombre(e.target.value)}
                        />
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Precio</label>
                        <input 
                            type='number'       // Tipo numérico
                            step='any'          // Permite decimales
                            placeholder='0.00'
                            className='form-control'
                            value={ precio }
                            onChange={(e)=> setPrecio(e.target.value)}
                        />
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Existencia</label>
                        <input 
                            type='number'       // Tipo numérico
                            placeholder='Cantidad en stock'
                            className='form-control'
                            value={ existencia }
                            onChange={(e)=> setExistencia(e.target.value)}
                        />
                    </div>

                    <button className='btn btn-success' onClick={ (e) => saveOrUpdateCliente(e)}>Guardar</button>
                    &nbsp;&nbsp;
                    <Link to ='/articulos' className='btn btn-danger'>Cancelar</Link>
                </form>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticuloComponent
