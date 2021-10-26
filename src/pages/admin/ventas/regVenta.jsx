import React from 'react'

export const RegVenta = () => {
    return (
        <div className='fondo'>
        <section className="form-registro ">
            <form>
                <h4>Registro de Venta</h4>
                <input className="controls" type="number" name="ID (Inmutable)"  defaultValue= "0000" max={9999} disabled />
                <input className="controls" type="number" name="Valor total de la Venta" placeholder="Valor Total Venta" required />
                <select className="controls mouse" required defaultValue={0}>
                    <option disabled value={0}>Seleccione Producto</option>
                    <option>Computador Todo en uno</option>
                    <option >Laptop</option>
                    <option >Teclado</option>
                    <option >Mouse</option>
                    <option >Disco Duro</option>
                    <option >Diadema</option>
                    <option >Usb</option>
                    <option >Parlantes</option>
                </select>
                <input className="controls " type="number" name="Cantidad" placeholder="Cantidad" required />
                <input className="controls " type="number" name="Precion unitario Producto" placeholder='Precio unitario' required />
                <input className="controls " type="date" name="Fecha de venta" required />
                <input className="controls " type="text" name="Nombre del Cliente" placeholder='Nombre del Cliente' required />
                <select className="controls mouse" required defaultValue={0}>
                    <option disabled value={0}>Seleccione Vendedor</option>
                    <option>Juan Carlos Perez</option>
                    <option >Tatiana Roa</option>
                    <option >Santiago Vivas</option>
                    <option >Helena Duarte</option>
                    <option >David Solano</option>
                    <option >Carmen Tapia</option>
                </select>
                <input className="controls " type="number" name="Documento identificación" placeholder='Doc. Identificación' required />
                <input className="botonRegistro" type="submit" onClick={()=>alert("La venta se ha añadido correctamente")} defaultValue="Añadir Venta" />
                
            </form>
        </section>
        </div>
    );
}



export default RegVenta;
