
import axios from "axios";

export const obtenerProductos = async (succesCallback, errorCallback) => {
    const options = { method: 'GET', url: 'https://afternoon-chamber-83835.herokuapp.com/productos/' };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const crearProducto = async (data, succesCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: 'https://sleepy-peak-71602.herokuapp.com/productos',
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const editarProducto = async (id, data, succesCallback, errorCallback) => {
    const options = {
        method: 'PATCH',
        url: 'https://afternoon-chamber-83835.herokuapp.com/productos' + id + '/',
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const eliminarProducto = async (id, succesCallback, errorCallback) => {
    const options = {
        method: 'DELETE',
        url: 'https://afternoon-chamber-83835.herokuapp.com/productos' + id + '/',
        headers: { 'Content-Type': 'application/json' }
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};



