import React from 'react'

function EditarUsuario() {
    return (
        <div className="fondo">
            <section className="form-registro ">
                <form>
                    <h4>Editar usuario</h4>
                    <input className="controls" type="text" name="Nombre" defaultValue="Andres" required disabled />
                    <input className="controls" type="email" name="E-mail" defaultValue="andresMartinez@gmail.com" required disabled />
                    <select className="controls mouse" required defaultValue={0}>
                        <option disabled >Rol del Usuario</option>
                        <option value={0}>Administrador</option>
                        <option>Vendedor</option>
                    </select>
                    <select className="controls mouse" required defaultValue={0}>
                        <option disabled>Estado del Usuario</option>
                        <option value={0}>Pendiente</option>
                        <option>Autorizado</option>
                        <option>No Autorizado</option>
                    </select>
                    <input className="botonRegistro" type="button" onClick={() => alert("El Usuario se ha editado correctamente")} defaultValue="Editar Producto" />

                </form>
            </section>
        </div>

    )
}

export default EditarUsuario;
