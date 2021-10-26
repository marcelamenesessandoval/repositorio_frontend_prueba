import React, { useEffect, useState, useRef } from "react";
import axios from "axios";



const EditarProducto = ({ producto, setMostrarTabla, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [infoEditada, setInfoEditada] = useState({
        idProduct: producto.idProduct, producto: producto.producto, descripcion: producto.descripcion,
        valorUnitario: producto.valorUnitario, estado: producto.estado
    }
    );


    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        const options = {
            method: 'PATCH',
            url: 'https://afternoon-chamber-83835.herokuapp.com/productos/' + producto._id + '/',
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoEditada },
        };


        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                alert("El producto se ha actualizado correctamente");
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                alert("Hubo un error al actualizar el producto");
                console.error(error);
            });


        setMostrarTabla(true)

    };


    return (
        <div className="fondo">
            <section className="form-registro">

                <form ref={form} onSubmit={submitForm}>
                    <h4>Editar de Producto</h4>
                    <label htmlFor="idProduct" className="labelForm">Identificador único de producto</label>
                    <input className="controls" type="number" name="idProduct" placeholder="Identificador unico" required value={infoEditada.idProduct}
                        onChange={(e) =>
                            setInfoEditada({ ...infoEditada, idProduct: e.target.value })
                        }
                    />

                    <label htmlFor="producto" className="labelForm">Nombre del producto</label>
                    <input className="controls" type="text" name="producto" placeholder="Nombre del Producto" required value={infoEditada.producto}
                        onChange={(e) =>
                            setInfoEditada({ ...infoEditada, producto: e.target.value })
                        } />

                    <label htmlFor="descripcion" className="labelForm">Descripción del producto</label>
                    <input className="controls descripcion" type="text" name="descripcion" placeholder="Añadir una descripcion del producto" required value={infoEditada.descripcion}
                        onChange={(e) =>
                            setInfoEditada({ ...infoEditada, descripcion: e.target.value })
                        }
                    />
                    
                    
                    <label htmlFor="valorUnitario" className="labelForm">Valor unitario del producto</label>
                    <input className="controls " type="number" name="valorUnitario" placeholder="Valor Unitario" required value={infoEditada.valorUnitario}
                        onChange={(e) =>
                            setInfoEditada({ ...infoEditada, valorUnitario: e.target.value })
                        } 
                    />


                    <label htmlFor="estado" className="labelForm">Estado</label>
                    <select className="controls mouse" name="estado" required defaultValue={producto.estado}
                        onChange={(e) =>
                            setInfoEditada({ ...infoEditada, estado: e.target.value })
                        }
                    >
                        <option disabled value=''>Estado del Producto</option>
                        <option >Disponible</option>
                        <option >No Disponible</option>
                    </select>


                    <button className="botonRegistro" type="submit">
                        Enviar
                    </button>
                </form>

            </section>
        </div>
    );
}

export default EditarProducto;