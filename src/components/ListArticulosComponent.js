import React, { useEffect, useState } from 'react';
import ClienteService from '../services/ClienteServices'; // <--- AJUSTA ESTA RUTA
import { Link } from 'react-router-dom';
import ArticulosServices from '../services/ArticulosServices';
import FooterComponent from './FooterComponent';

const ListArticulosComponent = () => {
    const [clientes, setClientes] = useState([]);
    
    useEffect(() => {
        listarClientes()
    }, []);

    const listarClientes = () => {
        ArticulosServices.getAllClientes()
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log("Error al obtener clientes:", error);    
            });

    }

    const deleteCliente = (clienteId) => {
        ArticulosServices.deleteCliente(clienteId).then((response) => {
            listarClientes();
        }).catch(error => {
            console.log(error);
        })


    }

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Articulos</h2>
            <Link to ='/add-articulo' className='btn btn-primary mb-2'>Agregar Articulo</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to ='/articulos' className='btn btn-primary mb-2'>Inventario</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precios</th>
                        <th>Existencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    clientes.map(
                        cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombrearticulo}</td>
                            <td>{cliente.precio}</td>
                            <td>{cliente.existencia}</td>
                            <td>
                                <Link className='btn btn-info' to={`/edit-articulo/${cliente.id}`}>Actualizar</Link>
                                <button style={{ marginLeft:"10px"}} className='btn btn-danger' onClick={() => deleteCliente(cliente.id)}>Eliminar   </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <FooterComponent />
        </div>
        
    );
}

export default ListArticulosComponent;
