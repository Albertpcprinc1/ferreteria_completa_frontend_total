import { useState, useEffect } from 'react';

export const useFetch = (serviceMethod, dependency = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        serviceMethod()
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error en useFetch:", error);
                setLoading(false);
            });
    }, dependency);

    return { data, loading };
};
