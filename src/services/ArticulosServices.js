import axios from "axios"

const ARTICULOS_BASE_REST_API_URL = "http://localhost:8081/api/articulos"

class ArticulosService{

    getAllClientes(){

        return axios.get(ARTICULOS_BASE_REST_API_URL);


    }

    createCliente(cliente){
        return axios.post(ARTICULOS_BASE_REST_API_URL,cliente)

    }

    getClienteById(clienteId){
        return axios.get(ARTICULOS_BASE_REST_API_URL + '/' + clienteId);
    }

    updateCliente(clienteId,cliente){
        return axios.put(ARTICULOS_BASE_REST_API_URL + '/' + clienteId,cliente);

    }

    deleteCliente(clienteId){
        return axios.delete(ARTICULOS_BASE_REST_API_URL + '/' + clienteId);
        
    }

}

const articuloServiceInstance = new ArticulosService();
export default articuloServiceInstance;