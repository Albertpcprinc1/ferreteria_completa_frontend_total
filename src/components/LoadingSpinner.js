import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container"> {/* Bloque */}
            <div className="spinner-container__loader"></div> {/* Elemento */}
            <p className="spinner-container__text spinner-container__text--animated"> {/* Elemento + Modificador */}
                Cargando datos del servidor...
            </p>
        </div>
    );
};

export default LoadingSpinner;
