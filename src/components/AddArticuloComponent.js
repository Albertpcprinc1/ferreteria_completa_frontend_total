import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticulosServices from '../services/ArticulosServices';
import { useForm } from '../hooks/useForm'; // TU CUSTOM HOOK (Criterio 3)
import ValidationError from './ValidationError'; // TU COMPONENTE BEM (Criterio 1 y 5)

const AddArticuloComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Implementación del Custom Hook para manejar el formulario
    const { values, errors, handleInputChange, validateForm, setValues } = useForm({
        nombrearticulo: '',
        precio: '',
        existencia: ''
    });

    const { nombrearticulo, precio, existencia } = values;

    useEffect(() => {
        if (id) {
            ArticulosServices.getClienteById(id).then((response) => {
                setValues(response.data);
            }).catch(error => console.log(error));
        }
    }, [id, setValues]);

    const saveOrUpdateArticulo = (e) => {
        e.preventDefault();

        // Validación antes de enviar (Usa la lógica del Hook)
        if (!validateForm()) return;

        const articuloData = {
            nombrearticulo,
            precio: Number(precio),
            existencia: parseInt(existencia, 10)
        };

        if (id) {
            ArticulosServices.updateCliente(id, articuloData)
                .then(() => navigate('/articulos'))
                .catch(err => console.error(err));
        } else {
            ArticulosServices.createCliente(articuloData)
                .then(() => navigate('/articulos'))
                .catch(err => console.error(err));
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 shadow'>
                    <h2 className='text-center mt-3'>{id ? 'Actualizar Artículo' : 'Agregar Artículo'}</h2>
                    <div className='card-body'>
                        <form className="form-bumeran"> {/* Ejemplo clase BEM */}
                            <div className='form-group mb-3'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    name='nombrearticulo'
                                    type='text'
                                    className={`form-control ${errors.nombrearticulo ? 'is-invalid' : ''}`}
                                    value={nombrearticulo}
                                    onChange={handleInputChange}
                                />
                                <ValidationError mensaje={errors.nombrearticulo} />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Precio</label>
                                <input
                                    name='precio'
                                    type='number'
                                    className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                                    value={precio}
                                    onChange={handleInputChange}
                                />
                                <ValidationError mensaje={errors.precio} />
                            </div>

                            <div className='form-group mb-4'>
                                <label className='form-label'>Existencia</label>
                                <input
                                    name='existencia'
                                    type='number'
                                    className='form-control'
                                    value={existencia}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button className='btn btn-success px-4' onClick={saveOrUpdateArticulo}>Guardar</button>
                                <Link to='/articulos' className='btn btn-danger ms-3'>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddArticuloComponent;
