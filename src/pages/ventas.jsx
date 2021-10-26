import React, { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import { nanoid } from "nanoid";
import axios from "axios";
import { obtenerProductos } from "utils/api";

const VentasPage = () => {
  const [ventas, setVentas] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [textoBoton, setTextoBoton] = useState("");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  const obtenerVentas = async () => {
    const options = { method: "GET", url: "https://afternoon-chamber-83835.herokuapp.com/ventas/" };
    await axios
      .request(options)
      .then(function (response) {
        setVentas(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    setEjecutarConsulta(false);
  };

  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Registrar venta");
    } else {
      setTextoBoton("Regresar");
    }
  }, [mostrarTabla]);

  return (
    <div className='styleContentSection'>
      {mostrarTabla ? (
        <TablaVentas
          listaVentas={ventas}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <IngresarPage
          setMostrarTabla={setMostrarTabla}
          listaVentas={ventas}
          setAgregarVenta={setVentas}
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

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

  console.log("Lista de ventas", listaVentas);
  console.log("Filtrados", ventasFiltradas);

  useEffect(() => {
    console.log("Este es el listado de ventas", listaVentas);
  }, [listaVentas]);

  useEffect(() => {
    console.log("Búsqueda", busqueda);
    setVentasFiltradas(
      listaVentas.filter((elemento) => {
        console.log("Elemento", elemento);
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);

  return (
    <>
      <h2 className='tableTitle'>Gestión de ventas</h2>
      <p className='textTable'>
        A continuación, se enseña el listado de ventas registradas. Para
        registrar una nueva venta, pulse el botón <b>Registrar venta.</b>
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
            <th className='column widthColumn'>NOMBRE DEL CLIENTE</th>
            <th className='column '>DOC. DE IDENTIDAD</th>
            <th className='column'>FECHA DE VENTA</th>
            <th className='column iconColumn'>OPCIONES</th>
          </tr>
        </thead>

        <tbody>
          {ventasFiltradas.map((venta) => {
            return (
              <FilaVenta
                venta={venta}
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

const FilaVenta = ({ setMostrarTabla, venta, setEjecutarConsulta }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  console.log("Venta:", venta);

  const eliminarVenta = async () => {
    const options = {
      method: "DELETE",
      url: "https://afternoon-chamber-83835.herokuapp.com/ventas/" + venta._id + "/",
      headers: { "Content-Type": "application/json" },
      data: { id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        alert("La venta se ha eliminado correctamente");
        setEjecutarConsulta(true);
      })

      .catch(function (error) {
        console.error("error", error);
        alert("Hubo un error al eliminar la venta");
      });
    setOpenDialog(false);
  };

  // CÓDIGO DE EDICIÓN
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [infoEditada, setInfoEditada] = useState({
    idVenta: venta.idVenta,
    valorTotal: venta.valorTotal,
    producto: productos.filter((el) => el._id === venta.producto)[0],
    cantidad: venta.cantidad,
    precioUnitarioProduct: venta.precioUnitarioProduct,
    fechaVenta: venta.fechaVenta,
    nombreCliente: venta.nombreCliente,
    vendedor: venta.vendedor,
    docIdentidadCliente: venta.docIdentidadCliente,
  });

  useEffect(() => {
    obtenerProductos(
      (response) => {
        setProductos(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    const options = {
      method: "PATCH",
      url: "https://afternoon-chamber-83835.herokuapp.com/ventas/" + venta._id + "/",
      headers: { "Content-Type": "application/json" },
      data: { ...infoEditada },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setEjecutarConsulta(true);
        alert("La venta se ha actualizado correctamente");
      })
      .catch(function (error) {
        alert("Hubo un error al actualizar la venta");
        console.error(error);
      });

    setOpenDialogEdit(false);
  };

  useEffect(() => {
    console.log("Productos seleccionados", productosSeleccionados);
  }, [productosSeleccionados]);

  const agregarNuevoProducto = () => {
    setProductosSeleccionados([...productosSeleccionados, DropDownProductos]);
  };

  // FIN DE EDICIÓN

  return (
    <tr className='row'>
      <td className='cell'>{venta.idVenta}</td>
      <td className='cell'>{venta.producto.producto}</td>

      <td className='cell'>{venta.nombreCliente}</td>
      <td className='cell'>{venta.docIdentidadCliente}</td>
      <td className='cell'>{venta.fechaVenta}</td>
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
            <p className='textDelete'>¿Está seguro de eliminar esta venta?</p>
          </div>
          <div className='divButtonDialog'>
            <button
              onClick={() => eliminarVenta()}
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
              <h4>Editar Venta</h4>
              <label htmlFor='idVenta' className='labelForm'>
                Identificador único de la venta
              </label>
              <input
                className='controls'
                type='number'
                name='idVenta'
                max={9999}
                placeholder='Identificador unico de venta'
                required
                disabled
                value={infoEditada.idVenta}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, idVenta: e.target.value })
                }
              />

              <label htmlFor='fechaVenta' className='labelForm'>
                Fecha de la venta
              </label>
              <input
                className='controls'
                type='date'
                name='fechaVenta'
                required
                value={infoEditada.fechaVenta}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, fechaVenta: e.target.value })
                }
              />

              <label htmlFor='nombreCliente' className='labelForm'>
                Nombre del cliente:{" "}
              </label>
              <input
                className='controls'
                type='text'
                name='nombreCliente'
                placeholder='Nombre del cliente'
                required
                value={infoEditada.nombreCliente}
                onChange={(e) =>
                  setInfoEditada({
                    ...infoEditada,
                    nombreCliente: e.target.value,
                  })
                }
              />

              <label htmlFor='docIdentidadCliente' className='labelForm'>
                Documento de identificación del cliente
              </label>
              <input
                className='controls '
                type='number'
                name='docIdentidadCliente'
                placeholder='Doc. Identificación'
                required
                value={infoEditada.docIdentidadCliente}
                onChange={(e) =>
                  setInfoEditada({
                    ...infoEditada,
                    docIdentidadCliente: e.target.value,
                  })
                }
              />

              <label htmlFor='vendedor' className='labelForm'>
                Nombre del vendedor
              </label>
              <input
                className='controls'
                type='text'
                name='vendedor'
                placeholder='Nombre del vendedor'
                required
                value={infoEditada.vendedor}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, vendedor: e.target.value })
                }
              />

              <div className='divAdd'>
                <button
                  onClick={() => agregarNuevoProducto()}
                  className='buttonAdd'
                >
                  + Agregar producto
                </button>
              </div>

              {productosSeleccionados.map((P) => {
                return <P key={nanoid()} productos={productos} />;
              })}

              <div className='divAgregarProducto'>
                <label htmlFor='producto' className='labelForm'>
                  Producto
                </label>
                <select
                  className='controls mouse'
                  name='producto'
                  required
                  value={infoEditada.producto}
                  onChange={(e) =>
                    setInfoEditada({ ...infoEditada, producto: e.target.value })
                  }
                >
                  <option disabled value=''>
                    Seleccione Producto
                  </option>
                  {productos.map((p) => {
                    return (
                      <option key={nanoid()} value={p._id}>
                        {p.producto}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor='cantidad' className='labelForm'>
                  Cantidad
                </label>
                <input
                  className='controls'
                  type='number'
                  name='cantidad'
                  placeholder='Cantidad'
                  required
                  value={infoEditada.cantidad}
                  onChange={(e) =>
                    setInfoEditada({ ...infoEditada, cantidad: e.target.value })
                  }
                />

                <label htmlFor='precioUnitarioProduct' className='labelForm'>
                  Precio unitario
                </label>
                <input
                  className='controls'
                  type='number'
                  name='precioUnitarioProduct'
                  placeholder='Precio unitario'
                  required
                  value={infoEditada.precioUnitarioProduct}
                  onChange={(e) =>
                    setInfoEditada({
                      ...infoEditada,
                      precioUnitarioProduct: e.target.value,
                    })
                  }
                />
              </div>

              <label htmlFor='valorTotal' className='labelForm'>
                Valor total de la venta
              </label>
              <input
                className='controls'
                type='number'
                name='valorTotal'
                placeholder='Valor Total Venta'
                required
                value={infoEditada.valorTotal}
                onChange={(e) =>
                  setInfoEditada({ ...infoEditada, valorTotal: e.target.value })
                }
              />

              <button onClick={() => submitForm} className='buttonDialogDelete'>
                Enviar
              </button>
              <button
                type='button'
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

const IngresarPage = ({ setMostrarTabla, listaVentas, setAgregarVenta }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const form = useRef(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos(
      (response) => {
        setProductos(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    console.log("nueva venta", nuevaVenta);

    const informacionConsolidada = {
      idVenta: nuevaVenta.idVenta,
      valorTotal: nuevaVenta.valorTotal,
      producto: productos.filter((el) => el._id === nuevaVenta.producto)[0],
      cantidad: nuevaVenta.cantidad,
      precioUnitarioProduct: nuevaVenta.precioUnitarioProduct,
      fechaVenta: nuevaVenta.fechaVenta,
      nombreCliente: nuevaVenta.nombreCliente,
      vendedor: nuevaVenta.vendedor,
      docIdentidadCliente: nuevaVenta.docIdentidadCliente,
    };

    const options = {
      method: "POST",
      url: "https://afternoon-chamber-83835.herokuapp.com/ventas",
      headers: { "Content-Type": "application/json" },
      data: informacionConsolidada,
    };

    console.log("Información consolidada de la venta", informacionConsolidada);

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        alert("La venta se ha añadido correctamente");
      })
      .catch(function (error) {
        console.error(error);
        alert("Hubo un error al guardar la venta");
      });

    setMostrarTabla(true);
  };

  useEffect(() => {
    console.log("estos son los productos", productos);
  }, [productos]);

  useEffect(() => {
    console.log("Productos seleccionados", productosSeleccionados);
  }, [productosSeleccionados]);

  const agregarNuevoProducto = () => {
    setProductosSeleccionados([...productosSeleccionados, DropDownProductos]);
  };

  return (
    <div className='fondo'>
      <section className='form-registro '>
        <form ref={form} onSubmit={submitForm}>
          <h4>Registro de Venta</h4>
          <label htmlFor='idVenta' className='labelForm'>
            Identificador único de la venta
          </label>
          <input
            className='controls'
            type='number'
            name='idVenta'
            max={9999}
            placeholder='Identificador unico de venta'
            required
          />

          <label htmlFor='fechaVenta' className='labelForm'>
            Fecha de la venta
          </label>
          <input className='controls' type='date' name='fechaVenta' required />

          <label htmlFor='nombreCliente' className='labelForm'>
            Nombre del cliente:{" "}
          </label>
          <input
            className='controls'
            type='text'
            name='nombreCliente'
            placeholder='Nombre del cliente'
            required
          />

          <label htmlFor='docIdentidadCliente' className='labelForm'>
            Documento de identificación del cliente
          </label>
          <input
            className='controls '
            type='number'
            name='docIdentidadCliente'
            placeholder='Doc. Identificación'
            required
          />

          <label htmlFor='vendedor' className='labelForm'>
            Nombre del vendedor
          </label>
          <input
            className='controls'
            type='text'
            name='vendedor'
            placeholder='Nombre del vendedor'
            required
          />

          <div className='divAdd'>
            <button
              type='button'
              onClick={() => agregarNuevoProducto()}
              className='buttonAdd'
            >
              + Agregar producto
            </button>
          </div>

          {productosSeleccionados.map((P) => {
            return <P key={nanoid()} productos={productos} />;
          })}

          <label htmlFor='valorTotal' className='labelForm'>
            Valor total de la venta
          </label>
          <input
            className='controls'
            type='number'
            name='valorTotal'
            placeholder='Valor Total Venta'
            required
          />

          <button className='botonRegistro' type='submit'>
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

const DropDownProductos = ({ productos, nombre }) => {
  return (
    <div className='divAgregarProducto'>
      <label htmlFor='producto' className='labelForm'>
        Producto
      </label>
      <select
        className='controls mouse'
        name='producto'
        required
        defaultValue=''
      >
        <option disabled value=''>
          Seleccione Producto
        </option>
        {productos.map((p) => {
          return (
            <option key={nanoid()} value={p._id}>
              {p.producto}
            </option>
          );
        })}
      </select>

      <label htmlFor='cantidad' className='labelForm'>
        Cantidad
      </label>
      <input
        className='controls'
        type='number'
        name='cantidad'
        placeholder='Cantidad'
        required
      />

      <label htmlFor='precioUnitarioProduct' className='labelForm'>
        Precio unitario
      </label>
      <input
        className='controls'
        type='number'
        name='precioUnitarioProduct'
        placeholder='Precio unitario'
        required
      />
    </div>
  );
};

// const EditarVenta = ({ venta, setMostrarTabla, setEjecutarConsulta }) => {
//   const [productosSeleccionados, setProductosSeleccionados] = useState([]);
//   const [infoEditada, setInfoEditada] = useState({
//     idVenta: venta.idVenta,
//     valorTotal: venta.valorTotal,
//     producto: productos.filter((el) => el._id === venta.producto)[0],
//     cantidad: venta.cantidad,
//     precioUnitarioProduct: venta.precioUnitarioProduct,
//     fechaVenta: venta.fechaVenta,
//     nombreCliente: venta.nombreCliente,
//     vendedor: venta.vendedor,
//     docIdentidadCliente: venta.docIdentidadCliente,
//   });
//   const [productos, setProductos] = useState([]);

//   useEffect(() => {
//     obtenerProductos(
//       (response) => {
//         setProductos(response.data);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }, []);

//   const form = useRef(null);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const fd = new FormData(form.current);
//     const nuevaVenta = {};
//     fd.forEach((value, key) => {
//       nuevaVenta[key] = value;
//     });

//     const options = {
//       method: "PATCH",
//       url: "http://localhost:5000/ventas/" + venta._id + "/",
//       headers: { "Content-Type": "application/json" },
//       data: { ...infoEditada },
//     };

//     await axios
//       .request(options)
//       .then(function (response) {
//         console.log(response.data);
//         alert("La venta se ha actualizado correctamente");
//         setEdit(false);
//         setEjecutarConsulta(true);
//       })
//       .catch(function (error) {
//         alert("Hubo un error al actualizar la venta");
//         console.error(error);
//       });

//     setMostrarTabla(true);
//   };

//   useEffect(() => {
//     console.log("Productos seleccionados", productosSeleccionados);
//   }, [productosSeleccionados]);

//   const agregarNuevoProducto = () => {
//     setProductosSeleccionados([...productosSeleccionados, DropDownProductos]);
//   };

//   return (
//     <div className='fondo'>
//       <section className='form-registro'>
//         <form ref={form} onSubmit={submitForm}>
//           <h4>Editar Venta</h4>
//           <label htmlFor='idVenta' className='labelForm'>
//             Identificador único de la venta
//           </label>
//           <input
//             className='controls'
//             type='number'
//             name='idVenta'
//             max={9999}
//             placeholder='Identificador unico de venta'
//             required
//             value={infoEditada.idVenta}
//             onChange={(e) =>
//               setInfoEditada({ ...infoEditada, idVenta: e.target.value })
//             }
//           />

//           <label htmlFor='fechaVenta' className='labelForm'>
//             Fecha de la venta
//           </label>
//           <input
//             className='controls'
//             type='date'
//             name='fechaVenta'
//             required
//             value={infoEditada.fechaVenta}
//             onChange={(e) =>
//               setInfoEditada({ ...infoEditada, fechaVenta: e.target.value })
//             }
//           />

//           <label htmlFor='nombreCliente' className='labelForm'>
//             Nombre del cliente:{" "}
//           </label>
//           <input
//             className='controls'
//             type='text'
//             name='nombreCliente'
//             placeholder='Nombre del cliente'
//             required
//             value={infoEditada.nombreCliente}
//             onChange={(e) =>
//               setInfoEditada({ ...infoEditada, nombreCliente: e.target.value })
//             }
//           />

//           <label htmlFor='docIdentidadCliente' className='labelForm'>
//             Documento de identificación del cliente
//           </label>
//           <input
//             className='controls '
//             type='number'
//             name='docIdentidadCliente'
//             placeholder='Doc. Identificación'
//             required
//             value={infoEditada.docIdentidadCliente}
//             onChange={(e) =>
//               setInfoEditada({
//                 ...infoEditada,
//                 docIdentidadCliente: e.target.value,
//               })
//             }
//           />

//           <label htmlFor='vendedor' className='labelForm'>
//             Nombre del vendedor
//           </label>
//           <input
//             className='controls'
//             type='text'
//             name='vendedor'
//             placeholder='Nombre del vendedor'
//             required
//             value={infoEditada.vendedor}
//             onChange={(e) =>
//               setInfoEditada({ ...infoEditada, vendedor: e.target.value })
//             }
//           />

//           <div className='divAdd'>
//             <button
//               onClick={() => agregarNuevoProducto()}
//               className='buttonAdd'
//             >
//               + Agregar producto
//             </button>
//           </div>

//           {productosSeleccionados.map((P) => {
//             return <P key={nanoid()} productos={productos} />;
//           })}

//           <label htmlFor='valorTotal' className='labelForm'>
//             Valor total de la venta
//           </label>
//           <input
//             className='controls'
//             type='number'
//             name='valorTotal'
//             placeholder='Valor Total Venta'
//             required
//             value={infoEditada.valorTotal}
//             onChange={(e) =>
//               setInfoEditada({ ...infoEditada, valorTotal: e.target.value })
//             }
//           />

//           <button className='botonRegistro' type='submit'>
//             Enviar
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

export default VentasPage;
