import React, { useEffect, useState } from 'react';
import ClienteService from '../services/ClienteServices'; // <--- AJUSTA ESTA RUTA
import { Link } from 'react-router-dom';

const ListClientesComponent = () => {
    const [clientes, setClientes] = useState([]);
    
    useEffect(() => {
        ClienteService.getAllClientes()
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log("Error al obtener clientes:", error);    
            });
    }, []);

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Clientes</h2>
            <Link to ='/add-cliente' className='btn btn-primary mb-2'>Agregar Cliente</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    clientes.map(
                        cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListClientesComponent;
