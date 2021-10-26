import React, { useEffect, useState } from 'react';

const IngresarPage = () => {

    const [idProducto, setIdProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [valorUnitarioProducto, setValorUnitarioProducto] = useState('');
    const [estadoProducto, setEstadoProducto] = useState('');

    
    useEffect(() => {
        console.log('Use efect que se ejecuta sólo una vez')
    }, []);


    const enviarDatos= () => {
        console.log("El id del producto es:", idProducto, " El nombre del producto es",nombreProducto, 
        " La descripción es: ",descripcionProducto," El valor es: ", valorUnitarioProducto, " El estado es: ", estadoProducto);
    };


    return (
        <div className="fondo">
            <section className="form-registro">
                <form>
                    <h4>Registro de Producto</h4>
                    <input onChange={(e) => { setIdProducto(e.target.value) }} value={idProducto} className="controls" type="number" name="ID (Inmutable)" placeholder="Identificador unico" max="9999" required />
                    <input onChange={(e) => { setNombreProducto(e.target.value) }} value={nombreProducto} className="controls" type="text" name="Nombre Producto" placeholder="Nombre del Producto" required />
                    <input onChange={(e) => { setDescripcionProducto(e.target.value) }} value={descripcionProducto} className="controls descripcion" type="text" name="Descripcion" placeholder="Añadir una descripcion del producto" required />
                    <input onChange={(e) => { setValorUnitarioProducto(e.target.value) }} value={valorUnitarioProducto} className="controls " type="number" name="Valor Unitario" placeholder="Valor Unitario" required />
                    <select onChange={(e) => { setEstadoProducto(e.target.value) }}  className="controls mouse" required defaultValue={0} >
                        <option disabled value={0} >Estado del Producto</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>
                       {/* Botón provisional luego agregar el alert*/}
                    <button type="button" onClick={()=> {enviarDatos()}}>
                        Enviar dos
                    </button>
                    <input className="botonRegistro" type="button" onClick={()=>alert("El producto se ha añadido correctamente")} defaultValue="Enviar" />
                </form>
             



            </section>
        </div>
    );
}

export default IngresarPage;
