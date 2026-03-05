import React from 'react';
import './ValidationError.css';

const ValidationError = ({ mensaje }) => {
    if (!mensaje) return null;
    return (
        <span className="form-error"> {/* Bloque */}
            <i className="form-error__icon">⚠️</i> {/* Elemento */}
            <span className="form-error__text">{mensaje}</span> {/* Elemento */}
        </span>
    );
};

export default ValidationError;
