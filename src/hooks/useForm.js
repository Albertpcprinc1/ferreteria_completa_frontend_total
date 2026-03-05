import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!values.nombrearticulo) formErrors.nombrearticulo = "El nombre es obligatorio";
        if (!values.precio || values.precio <= 0) formErrors.precio = "Precio debe ser mayor a 0";
        
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // true si no hay errores
    };

    return { values, errors, handleInputChange, validateForm, setValues };
};
