import React, { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import { nanoid } from "nanoid";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  const obtenerProductos = async () => {
    const options = { method: "GET", url: "https://afternoon-chamber-83835.herokuapp.com/productos/" };
    await axios
      .request(options)
      .then(function (response) {
        setProductos(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    setEjecutarConsulta(false);
  };

  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProductos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Registrar producto");
    } else {
      setTextoBoton("Regresar");
    }
  }, [mostrarTabla]);

  return (
    <div className='styleContentSection'>
      {mostrarTabla ? (
        <TablaProductos
          listaProductos={productos}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <IngresarPage
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setAgregarProducto={setProductos}
        />
      )}
      ;
      <button
        onClick={() => {
          setMostrarTabla(!mostrarTabla);
        }}
        className='buttonCreate'
      >
        {textoBoton}
      </button>
    </div>
  );
};

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  console.log("Lista de productos", listaProductos);
  console.log("Filtrados", productosFiltrados);

  useEffect(() => {
    console.log("Este es el listado de productos", listaProductos);
  }, [listaProductos]);

  useEffect(() => {
    console.log("Búsqueda", busqueda);
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        console.log("Elemento", elemento);
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <>
      <h2 className='tableTitle'>Gestión de productos</h2>
      <p className='textTable'>
        A continuación, se enseña el listado de productos registrados. Para
        registrar un nuevo producto, pulse el botón <b>Registrar producto.</b>
      </p>

      <section className='styleOptionsTable'>
        <div className='searchInTable'>
          <label className='labelSearch' htmlFor='buscar'>
            Buscar:{" "}
          </label>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className='inputSearch'
            type='text'
          />
        </div>
      </section>

      <table className='table'>
        <thead>
          <tr className='fila'>
            <th className='column narrowColumn'>ID</th>
            <th className='column'>PRODUCTO</th>
            <th className='column widthColumn'>DESCRIPCIÓN</th>
            <th className='column iconColumn'>OPCIONES</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((producto) => {
            return (
              <FilaProducto
                producto={producto}
                setEjecutarConsulta={setEjecutarConsulta}
                key={nanoid()}
              />
            );
          })}
        </tbody>
      </table>

      <section className='pager'>
        <div className='numPag'>
          <i className='fas fa-chevron-left'></i>
        </div>
        <div className='numPag'>1</div>
        <div className='numPag'>2</div>
        <div className='numPag'>3</div>
        <div className='numPag'>4</div>
        <div className='numPag'>5</div>
        <div className='numPag'>
          <i className='fas fa-chevron-right'></i>
        </div>
      </section>
    </>
  );
};

const FilaProducto = ({ setMostrarTabla, producto, setEjecutarConsulta }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  console.log("Producto:", producto);

  const eliminarProducto = async () => {
    const options = {
      method: "DELETE",
      url: "https://afternoon-chamber-83835.herokuapp.com/productos/" + producto._id + "/",
      headers: { "Content-Type": "application/json" },
      data: { id: producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setEjecutarConsulta(true);
        alert("El producto se ha eliminado correctamente");
      })

      .catch(function (error) {
        console.error("error", error);
        alert("Hubo un error al eliminar el producto");
      });
    setOpenDialog(false);
  };

  // CÓDIGO DE EDICIÓN

  const [infoEditada, setInfoEditada] = useState({
    idProduct: producto.idProduct,
    producto: producto.producto,
    descripcion: producto.descripcion,
    valorUnitario: producto.valorUnitario,
    estado: producto.estado,
  });

  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    const options = {
      method: "PATCH",
      url: "https://afternoon-chamber-83835.herokuapp.com/productos/" + producto._id + "/",
      headers: { "Content-Type": "application/json" },
      data: { ...infoEditada },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setEjecutarConsulta(true);
        alert("El producto se ha actualizado correctamente");
      })
      .catch(function (error) {
        alert("Hubo un error al actualizar el producto");
        console.error(error);
      });

    setOpenDialogEdit(false);
  };

  // FINALIZA LA PARTE DE EDICIÓN

  return (
    <tr className='row'>
      <td className='cell'>{producto.idProduct}</td>
      <td className='cell'>{producto.producto}</td>
      <td className='cell'>{producto.descripcion}</td>
      <td className='cell'>
        {/* <i className="far fa-eye detailIcon tooltip">
                    <span className="tooltipText">Detalles</span>
                </i> */}

        <i
          className='far fa-edit editIcon tooltip'
          onClick={() => setOpenDialogEdit(true)}
        >
          <span className='tooltipText'>Editar</span>
        </i>

        <i
          class='fas fa-trash-alt deleteIcon tooltip'
          onClick={() => setOpenDialog(true)}
        >
          <span className='tooltipText'>Eliminar</span>
        </i>

        <Dialog fullWidth maxWidth='sm' className='dialog' open={openDialog}>
          <h3 className='titleDialog'>Confirmar eliminación</h3>
          <div>
            <p className='textDelete'>
              ¿Está seguro de eliminar este producto?
            </p>
          </div>
          <div className='divButtonDialog'>
            <button
              onClick={() => eliminarProducto()}
              className='buttonDialogDelete'
            >
              Sí, eliminar
            </button>

            
            <button
              onClick={() => setOpenDialog(false)}
              className='buttonDialogDelete'
            >
              Cancelar
            </button>
          </div>
        </Dialog>

        <Dialog
          fullWidth
          maxheight='200%'
          className='dialogEdit'
          open={openDialogEdit}
        >
          <section className='form-edit'>
            <form ref={form} onSubmit={submitForm}>
              <h4>Editar de Producto</h4>
              <label htmlFor='idProduct' className='labelForm'>
                Identificador único de producto
              </label>
              <input
                className='controls'
                type='number'
                name='idProduct'
                placeholder='Identificador unico'
                required
                disabled
                value={infoEditada.idProduct}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, idProduct: e.target.value })
                }
              />

              <label htmlFor='producto' className='labelForm'>
                Nombre del producto
              </label>
              <input
                className='controls'
                type='text'
                name='producto'
                placeholder='Nombre del Producto'
                required
                value={infoEditada.producto}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, producto: e.target.value })
                }
              />

              <label htmlFor='descripcion' className='labelForm'>
                Descripción del producto
              </label>
              <input
                className='controls descripcion'
                type='text'
                name='descripcion'
                placeholder='Añadir una descripcion del producto'
                required
                value={infoEditada.descripcion}
                onChange={(e) =>
                  setInfoEditada({
                    ...infoEditada,
                    descripcion: e.target.value,
                  })
                }
              />

              <label htmlFor='valorUnitario' className='labelForm'>
                Valor unitario del producto
              </label>
              <input
                className='controls '
                type='number'
                name='valorUnitario'
                placeholder='Valor Unitario'
                required
                value={infoEditada.valorUnitario}
                onChange={(e) =>
                  setInfoEditada({
                    ...infoEditada,
                    valorUnitario: e.target.value,
                  })
                }
              />

              <label htmlFor='estado' className='labelForm'>
                Estado
              </label>
              <select
                className='controls mouse'
                name='estado'
                required
                defaultValue={producto.estado}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, estado: e.target.value })
                }
              >
                <option disabled value=''>
                  Estado del Producto
                </option>
                <option>Disponible</option>
                <option>No Disponible</option>
              </select>

              <button
              onClick={() => (submitForm)}
              className='buttonDialogDelete'
            >
              Enviar
            </button>
              <button type="button"
              onClick={() => setOpenDialogEdit(false)}
              className='buttonDialogDelete'
            >
              Cancelar
            </button>
            
            
            
            </form>
          </section>
        </Dialog>
      </td>
    </tr>
  );
};

const IngresarPage = ({
  setMostrarTabla,
  listaProductos,
  setAgregarProducto,
}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    const options = {
      method: "POST",
      url: "https://afternoon-chamber-83835.herokuapp.com/productos/",
      headers: { "Content-Type": "application/json" },
      data: {
        idProduct: nuevoProducto.idProduct,
        producto: nuevoProducto.producto,
        descripcion: nuevoProducto.descripcion,
        valorUnitario: nuevoProducto.valorUnitario,
        estado: nuevoProducto.estado,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        alert("El producto se ha añadido correctamente");
      })
      .catch(function (error) {
        console.error(error);
        alert("Hubo un error al guardar el producto");
      });

    setMostrarTabla(true);
  };

  return (
    <div className='fondo'>
      <section className='form-registro'>
        <form ref={form} onSubmit={submitForm}>
          <h4>Registro de Producto</h4>
          <label htmlFor='idProduct' className='labelForm'>
            Identificador único de producto
          </label>
          <input
            className='controls'
            type='number'
            name='idProduct'
            placeholder='Identificador unico producto'
            required
          />
          <label htmlFor='producto' className='labelForm'>
            Nombre del producto
          </label>
          <input
            className='controls'
            type='text'
            name='producto'
            placeholder='Nombre del Producto'
            required
          />
          <label htmlFor='descripcion' className='labelForm'>
            Descripción del producto
          </label>
          <input
            className='controls descripcion'
            type='text'
            name='descripcion'
            placeholder='Añadir una descripcion del producto'
            required
          />
          <label htmlFor='valorUnitario' className='labelForm'>
            Valor unitario del producto
          </label>
          <input
            className='controls '
            type='number'
            name='valorUnitario'
            placeholder='Valor Unitario'
            required
          />
          <label htmlFor='estado' className='labelForm'>
            Estado
          </label>
          <select
            className='controls mouse'
            name='estado'
            defaultValue=''
            required
          >
            <option disabled value=''>
              Estado del Producto
            </option>
            <option>Disponible</option>
            <option>No Disponible</option>
          </select>

          <button className='botonRegistro' type='submit'>
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

// const EditarProducto = ({ producto, setMostrarTabla, setEjecutarConsulta }) => {
//     const [edit, setEdit] = useState(false);
//     const [infoEditada, setInfoEditada] = useState({
//         idProduct: producto.idProduct, producto: producto.producto, descripcion: producto.descripcion,
//         valorUnitario: producto.valorUnitario, estado: producto.estado
//     }
//     );

//     const form = useRef(null);

//     const submitForm = async (e) => {
//         e.preventDefault();
//         const fd = new FormData(form.current);
//         const nuevoProducto = {};
//         fd.forEach((value, key) => {
//             nuevoProducto[key] = value;
//         });

//         const options = {
//             method: 'PATCH',
//             url: 'http://localhost:5000/productos/' + producto._id + '/',
//             headers: { 'Content-Type': 'application/json' },
//             data: { ...infoEditada },
//         };

//         await axios
//             .request(options)
//             .then(function (response) {
//                 console.log(response.data);
//                 alert("El producto se ha actualizado correctamente");
//                 setEdit(false);
//                 setEjecutarConsulta(true);
//             })
//             .catch(function (error) {
//                 alert("Hubo un error al actualizar el producto");
//                 console.error(error);
//             });

//         setMostrarTabla(true)

//     };

//     return (
//         <div className="fondo">
//             <section className="form-registro">

//                 <form ref={form} onSubmit={submitForm}>
//                     <h4>Editar de Producto</h4>
//                     <label htmlFor="idProduct" className="labelForm">Identificador único de producto</label>
//                     <input className="controls" type="number" name="idProduct" placeholder="Identificador unico" required value={infoEditada.idProduct}
//                         onChange={(e) =>
//                             setInfoEditada({ ...infoEditada, idProduct: e.target.value })
//                         }
//                     />

//                     <label htmlFor="producto" className="labelForm">Nombre del producto</label>
//                     <input className="controls" type="text" name="producto" placeholder="Nombre del Producto" required value={infoEditada.producto}
//                         onChange={(e) =>
//                             setInfoEditada({ ...infoEditada, producto: e.target.value })
//                         } />

//                     <label htmlFor="descripcion" className="labelForm">Descripción del producto</label>
//                     <input className="controls descripcion" type="text" name="descripcion" placeholder="Añadir una descripcion del producto" required value={infoEditada.descripcion}
//                         onChange={(e) =>
//                             setInfoEditada({ ...infoEditada, descripcion: e.target.value })
//                         }
//                     />

//                     <label htmlFor="valorUnitario" className="labelForm">Valor unitario del producto</label>
//                     <input className="controls " type="number" name="valorUnitario" placeholder="Valor Unitario" required value={infoEditada.valorUnitario}
//                         onChange={(e) =>
//                             setInfoEditada({ ...infoEditada, valorUnitario: e.target.value })
//                         }
//                     />

//                     <label htmlFor="estado" className="labelForm">Estado</label>
//                     <select className="controls mouse" name="estado" required defaultValue={producto.estado}
//                         onChange={(e) =>
//                             setInfoEditada({ ...infoEditada, estado: e.target.value })
//                         }
//                     >
//                         <option disabled value=''>Estado del Producto</option>
//                         <option >Disponible</option>
//                         <option >No Disponible</option>
//                     </select>

//                     <button className="botonRegistro" type="submit">
//                         Enviar
//                     </button>
//                 </form>

//             </section>
//         </div>
//     );
// }

export default ProductosPage;
