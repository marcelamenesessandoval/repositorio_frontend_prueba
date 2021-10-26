
import Tooltip from '@mui/material/Tooltip';
import React from 'react'

const EdiVenta = () => {
    return (
        <div className='fondo'>
        <section className="form-registro ">
            <form>
                <h4>Edicion de Venta</h4>
                <input className="controls" type="number" name="ID (Inmutable)"  defaultValue= "0000" max={9999} disabled />
                <input className="controls" type="number" name="Valor total de la Venta" defaultValue= '300.000' required />
                <select className="controls mouse" required defaultValue={0}>
                    <option disabled>Seleccione Producto</option>
                    <option>Computador Todo en uno</option>
                    <option >Laptop</option>
                    <option value={0}>Teclado</option>
                    <option >Mouse</option>
                    <option >Disco Duro</option>
                    <option >Diadema</option>
                    <option >Usb</option>
                    <option >Parlantes</option>
                </select>
                <input className="controls " type="number" name="Cantidad" defaultValue= '8' required />
                <input className="controls " type="number" name="Precion unitario Producto" defaultValue= '37.500' required />
                <input className="controls " type="date" name="Fecha de venta"  required />
                <input className="controls " type="text" name="Nombre del Cliente" defaultValue= 'Sergio Perez' required />
                <select className="controls mouse" required defaultValue={0}>
                    <option disabled>Seleccione Vendedor</option>
                    <option>Juan Carlos Perez</option>
                    <option value={0}>Tatiana Roa</option>
                    <option >Santiago Vivas</option>
                    <option >Helena Duarte</option>
                    <option >David Solano</option>
                    <option >Carmen Tapia</option>
                </select>
                <input className="controls " type="number" name="Documento identificación" defaultValue= '1032444437' required />
                <Tooltip title="Confirmar edición" arrow placement= "top">
                <input className="botonRegistro" type="submit" onClick={()=>alert("La venta se ha añadido correctamente")} defaultValue="Añadir Venta" />
                </Tooltip>
                
            </form>
        </section>
        </div>
    );
}

export default EdiVenta;
