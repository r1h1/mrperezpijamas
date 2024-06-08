//ROUTES
const carritoPorUsuarioRoute = 'https://coreapimrperez.somee.com/api/Carrito/FilterByUser/';
const carritoRoute = 'https://coreapimrperez.somee.com/api/Carrito';
const metodosPagoRoute = 'https://coreapimrperez.somee.com/api/MetodosPago';
const ordenRoute = 'https://coreapimrperez.somee.com/api/Orden';
const ProductosRoute = 'https://coreapimrperez.somee.com/api/Productos';

document.getElementById("invoiceAndDelivery").style.display = "none";
//TOAST SWEETALERT2
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3200
});

const getCarritoPorUsuario = async () => {
    try {
        let idUsuarioLogueado = sessionStorage.getItem("signInInfo");
        let usuarioInfo = JSON.parse(idUsuarioLogueado);
        let usuarioId = usuarioInfo.usuarioId;
        let rutaCompleta = carritoPorUsuarioRoute + usuarioId;

        if (idUsuarioLogueado == "") {
            //NO HACE NADA PORQUE NO DETECTA INICIO DE SESION, INGRESA LA VALIDACION JS VALIDAR TOKEN
        }
        else {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const showData = (dataObtained) => {
                mostrarDatosCarritoPorUsuario(dataObtained);
                mostrarProductosEnCarrito(dataObtained);
            }
            try {
                const response = await fetch(rutaCompleta, requestOptions);
                const dataObtained = await response.json();
                showData(dataObtained);
            } catch (error) {
                console.log(error);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
getCarritoPorUsuario();


const getTotalCarrito = async () => {
    try {

        let idUsuarioLogueado = sessionStorage.getItem("signInInfo");
        let usuarioInfo = JSON.parse(idUsuarioLogueado);
        let usuarioId = usuarioInfo.usuarioId;
        let rutaCompleta = carritoPorUsuarioRoute + usuarioId;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            document.getElementById('cantidadCarrito').innerHTML = dataObtained.cantidadTotalEnCarrito;
        }
        try {
            const response = await fetch(rutaCompleta, requestOptions);
            const dataObtained = await response.json();
            showData(dataObtained);
        } catch (error) {
            console.log("Desconexion con el servidor");
            document.getElementById('cantidadCarrito').innerHTML = '0';
        }
    }
    catch (error) {
        console.log(error);
        document.getElementById('cantidadCarrito').innerHTML = '0';
    }
}
getTotalCarrito();


const buyContinue = () => {
    try {
        let totalCantidadCarrito = document.getElementById('totalCantidadCarrito').innerHTML;

        if (totalCantidadCarrito > 0) {
            document.getElementById("invoiceAndDelivery").style.display = "block";
            window.location.href = "#payment";
        }
        else {
            document.getElementById("invoiceAndDelivery").style.display = "none";
            var Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            Toast.fire({
                icon: 'warning',
                title: 'Primero agrega productos a tu carrito para continuar'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarDatosCarritoPorUsuario = (dataObtained) => {

    try {
        if (dataObtained.cantidadTotalEnCarrito > 0) {

            let cantidadTotalCarrito = 0;
            for (let i = 0; i < dataObtained.cantidadTotalEnCarrito; i++) {
                cantidadTotalCarrito += dataObtained.carritoData[i].totalCantidad;
            }
            document.getElementById('totalCantidadCarrito').innerHTML = cantidadTotalCarrito;
            mostrarInformacionEnvioPorUsuario(dataObtained);

        } else {
            document.getElementById('totalCantidadCarrito').innerHTML = "0.00";
            Toast.fire({
                icon: 'warning',
                title: 'No se encontraron productos en el carrito para este usuario.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const mostrarInformacionEnvioPorUsuario = (dataObtained) => {

    try {
        if (dataObtained.cantidadTotalEnCarrito > 0) {

            document.getElementById('TxtNombresYApellidos').value = dataObtained.carritoData[0].nombreCompleto;
            document.getElementById('TxtDireccion').value = dataObtained.carritoData[0].direccion;
            document.getElementById('TxtReferencia').value = dataObtained.carritoData[0].referencia;
            document.getElementById('TxtNit').value = dataObtained.carritoData[0].nit;
            document.getElementById('TxtTelefono').value = dataObtained.carritoData[0].telefono;
            document.getElementById('TxtCiudad').value = dataObtained.carritoData[0].ciudad;
            document.getElementById('TxtMunicipio').value = dataObtained.carritoData[0].municipio;
            document.getElementById('TxtPais').value = dataObtained.carritoData[0].pais;

        } else {
            document.getElementById('totalCantidadCarrito').innerHTML = "0.00";
            Toast.fire({
                icon: 'warning',
                title: 'No se encontró información de envío para el usuario, llene manualmente.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const getMetodosPago = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            if (dataObtained.length > 0) {
                let bodydata = '';
                for (let i = 0; i < dataObtained.length; i++) {
                    bodydata += `
                        <option value="${dataObtained[i].metodoPagoId}">${dataObtained[i].nombre}</option>
                    `;
                }
                document.getElementById('CboMetodosPago').innerHTML = bodydata;
            }
            else {
                document.getElementById('CboMetodosPago').disabled = true;
                Toast.fire({
                    icon: 'warning',
                    title: 'No se encontraron métodos de pago para seleccionar, informe al administrador.'
                });
            }
        }
        try {
            const response = await fetch(metodosPagoRoute, requestOptions);
            const dataObtained = await response.json();
            showData(dataObtained);
        } catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        console.log(error);
    }
}
getMetodosPago();



const validarDatosLlenosFinalizarCompra = () => {
    try {
        let chkFinalizarCompra = document.getElementById('ChkFinalizarCompra').checked;
        let nombreCompleto = document.getElementById('TxtNombresYApellidos').value;
        let direccion = document.getElementById('TxtDireccion').value;
        let referencia = document.getElementById('TxtReferencia').value;
        let nit = document.getElementById('TxtNit').value;
        let telefono = document.getElementById('TxtTelefono').value;
        let ciudad = document.getElementById('TxtCiudad').value;
        let municipio = document.getElementById('TxtMunicipio').value;
        let pais = document.getElementById('TxtPais').value;
        let metodoPago = document.getElementById('CboMetodosPago').value;
        let descripcionOrden = document.getElementById('TxtDescripcionOrden').value;

        if (chkFinalizarCompra) {
            if (nombreCompleto !== '' && direccion.trim() !== '' && referencia.trim() !== ''
                && nit.trim() !== '' && telefono.trim() !== '' && ciudad.trim() !== ''
                && municipio.trim() !== '' && pais.trim() !== '' && metodoPago.trim() !== ''
                && descripcionOrden.trim() !== '') {
                generarOrdenYFinalizarCarrito();
            } else {
                Toast.fire({
                    icon: 'warning',
                    title: 'Todos los datos del formulario son obligatorios para continuar.'
                });
            }
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'Presiona las políticas de aceptación de uso de información para proceder con tu compra y envío.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}



const generarOrdenYFinalizarCarrito = () => {
    try {

        let totalCantidadCarrito = document.getElementById('totalCantidadCarrito').innerHTML;
        const generarNumeroUnico = () => {
            let numero = '';
            const caracteres = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
            const longitudNumero = 25; // Longitud del número generado

            // Crear un conjunto para almacenar los números generados
            const numerosGenerados = new Set();

            while (numero.length < longitudNumero) {
                let nuevoCaracter = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                numero += nuevoCaracter;

                // Verificar si el número generado ya existe en el conjunto
                if (numerosGenerados.has(numero)) {
                    // Si el número ya existe, reiniciamos la generación
                    numero = '';
                } else {
                    // Si el número no existe, lo agregamos al conjunto
                    numerosGenerados.add(numero);
                }
            }
            return numero;
        };

        const numeroOrdenGenerado = generarNumeroUnico();
        insertarOrdenDeCompraYBorrarCarritoLogicamente(numeroOrdenGenerado, totalCantidadCarrito);
    }
    catch (error) {
        console.log(error);
    }
}


const insertarOrdenDeCompraYBorrarCarritoLogicamente = (numeroOrdenGenerado, totalCantidadCarrito) => {
    try {
        if (numeroOrdenGenerado == "" && totalCantidadCarrito == "") {
            Toast.fire({
                icon: 'warning',
                title: 'No se generó ningún número de órden o no tiene cantidad de carrito.'
            });
        }
        else {
            let idUsuarioLogueado = sessionStorage.getItem("signInInfo");
            let idProducto = document.getElementById('LblIdProducto').innerHTML;
            let cantidadProducto = document.getElementById('TxtCantidadProducto').value;
            let descripcionOrden = document.getElementById('TxtDescripcionOrden').value;
            let usuarioInfo = JSON.parse(idUsuarioLogueado);
            let usuarioId = usuarioInfo.usuarioId;

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "ordenId": 0,
                "numeroDeOrden": numeroOrdenGenerado,
                "descripcion": descripcionOrden,
                "productoId": parseInt(idProducto),
                "usuarioId": parseInt(usuarioId),
                "cantidad": parseInt(cantidadProducto),
                "totalCantidad": parseFloat(totalCantidadCarrito),
                "fechaPedido": null,
                "fechaPago": null,
                "fechaRuta": null,
                "fechaEntrega": null,
                "estado": 1,
                "activo": 1
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(ordenRoute, requestOptions)
                .then(response => response.json())
                .then(dataObtained => showData(dataObtained))
                .catch(error => err = error);

            const showData = (dataObtained) => {
                if (dataObtained.isSuccess === true) {
                    try {
                        window.location.href = 'ordernumber.html?n=' + numeroOrdenGenerado + '&q=' + totalCantidadCarrito;
                    }
                    catch (err) {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Se ha generado un error interno ' + err
                        });
                    }
                }
                else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Se ha generado un error interno'
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarProductosEnCarrito = (dataObtained) => {
    try {
        let bodydata = '';
        if (dataObtained.cantidadTotalEnCarrito === 0) {
            bodydata += `
            <tr>
                <td>
                    <p class="text-muted fw-bold">-- El carrito está vacío --</p>
                </td>
            </tr>
            `;
        } else {
            for (let i = 0; i < dataObtained.carritoData.length; i++) {
                const item = dataObtained.carritoData[i];
                if (!item) {
                    // Skip iteration if item is falsy
                    continue;
                }

                const {
                    carritoId,
                    productoId,
                    productoImagen,
                    productoNombre,
                    productoCantidad,
                    productoPrecio,
                    productoDescripcion,
                    totalCantidad,
                    usuarioId,
                    cantidad,
                    marcaId,
                    categoriaId,
                    generoId
                } = item;

                const nuevaCantidad = cantidad + productoCantidad;

                bodydata += `
                    <tr>
                        <td hidden>
                            <p id="LblIdCarrito">${carritoId}</p>
                        </td>
                        <td hidden>
                            <p id="LblIdProducto">${productoId}</p>
                        </td>
                        <td>#${i + 1}</td>
                        <td>
                            <img src="${productoImagen}" alt="photo-cart" width="75">
                        </td>
                        <td class="fw-bold">${productoNombre}</td>
                        <td>
                            <input type="number" class="border border-2 text-center" value="${cantidad}" min="1" id="TxtCantidadProducto" disabled>
                        </td>
                        <td hidden>
                            <input type="number" class="border border-2 text-center" value="${productoPrecio}" min="1">
                        </td>
                        <td hidden>
                            <input type="number" class="border border-2 text-center" value="${productoDescripcion}" min="1">
                        </td>
                        <td>Q<span id="LblTotalPrecio">${totalCantidad}</span></td>
                        <td>
                            <div class="row g-2">
                                <div class="col-md-12 col-lg-12">
                                    <button class="btn btn-danger" onclick="recomposicionProductoAlEliminarDeCarrito(
                                        ${productoId}, '${productoImagen}', '${productoNombre}', ${productoCantidad}, ${productoPrecio}, 
                                        '${productoDescripcion}', '${totalCantidad}', ${nuevaCantidad}, ${usuarioId}, ${carritoId}, ${cantidad}, 
                                        ${marcaId}, ${categoriaId}, ${generoId})"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `;
            }
        }
        document.getElementById('TblProductosEnCarrito').innerHTML = bodydata;
        document.getElementById('LblCantidadProductos').innerHTML = ': ' + dataObtained.cantidadTotalEnCarrito;
    } catch (error) {
        console.log(error);
    }
}



const recomposicionProductoAlEliminarDeCarrito = (IdProducto, ProductoImagen, ProductoNombre, ProductoCantidad,
    ProductoPrecio, ProductoDescripcion, TotalCantidad, NuevaCantidad, UsuarioCarrito, IdCarrito,
    CarritoCantidad, ProductoMarca, ProductoCategoria, ProductoGenero) => {
    try {

        console.log(IdProducto, 'IMAGEN', ProductoNombre, ProductoCantidad, ProductoPrecio, 
            ProductoDescripcion, TotalCantidad, NuevaCantidad, UsuarioCarrito, IdCarrito, 
            CarritoCantidad, ProductoMarca, ProductoCategoria, ProductoGenero);

        if (IdProducto != "" && ProductoImagen != "" && ProductoImagen != "" && ProductoNombre != ""
            && ProductoPrecio != "" && ProductoDescripcion != ""
            && TotalCantidad != "" && NuevaCantidad != "" && UsuarioCarrito != "" && IdCarrito != "" && CarritoCantidad != ""
            && ProductoMarca != "" && ProductoCategoria != "" && ProductoGenero != "") {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "productoId": IdProducto,
                "nombre": ProductoNombre,
                "descripcion": ProductoDescripcion,
                "cantidad": NuevaCantidad,
                "precio": ProductoPrecio,
                "imagen": ProductoImagen,
                "marcaId": ProductoMarca,
                "categoriaId": ProductoCategoria,
                "generoId": ProductoGenero,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(ProductosRoute, requestOptions)
                .then(response => response.json())
                .then(dataObtained => showData(dataObtained))
                .catch(error => err = error);

            const showData = (dataObtained) => {
                if (dataObtained.isSuccess === true) {
                    try {
                        borradoLogicoProductoEnCarrito(IdProducto, ProductoImagen, ProductoNombre, ProductoPrecio,
                            ProductoDescripcion, TotalCantidad, NuevaCantidad, UsuarioCarrito, IdCarrito, CarritoCantidad,
                            ProductoMarca, ProductoCategoria, ProductoGenero, true);
                    }
                    catch (err) {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Se ha generado un error interno ' + err
                        });
                    }
                }
                else {
                    Toast.fire({
                        icon: 'warning',
                        title: 'No se pudo completar el proceso, informe al administrador.'
                    });
                }
            }
        }
        else {
            Toast.fire({
                icon: 'warning',
                title: 'No se pudieron obtener los datos.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const borradoLogicoProductoEnCarrito = (IdProducto, ProductoImagen, ProductoNombre, ProductoPrecio,
    ProductoDescripcion, TotalCantidad, NuevaCantidad, UsuarioCarrito, IdCarrito, CarritoCantidad,
    ProductoMarca, ProductoCategoria, ProductoGenero, Respuesta) => {
    try {
        if (Respuesta) {
            if (IdProducto != "" && ProductoImagen != "" && ProductoImagen != "" && ProductoNombre != ""
                && ProductoPrecio != "" && ProductoDescripcion != ""
                && TotalCantidad != "" && NuevaCantidad != "" && UsuarioCarrito != "" && IdCarrito != "" && CarritoCantidad != ""
                && ProductoMarca != "" && ProductoCategoria != "" && ProductoGenero != "") {

                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "carritoId": IdCarrito,
                    "productoId": IdProducto,
                    "usuarioId": UsuarioCarrito,
                    "cantidad": CarritoCantidad,
                    "totalCantidad": TotalCantidad,
                    "estado": 0
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(carritoRoute, requestOptions)
                    .then(response => response.json())
                    .then(dataObtained => showData(dataObtained))
                    .catch(error => err = error);

                const showData = (dataObtained) => {
                    if (dataObtained.isSuccess === true) {
                        try {
                            Toast.fire({
                                icon: 'success',
                                title: 'Completado con éxito.'
                            });
                            getCarritoPorUsuario();
                            getTotalCarrito();
                        }
                        catch (err) {
                            Toast.fire({
                                icon: 'warning',
                                title: 'Se ha generado un error interno ' + err
                            });
                        }
                    }
                    else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'No se pudo completar el proceso, informe al administrador.'
                        });
                    }
                }
            }
            else {
                Toast.fire({
                    icon: 'warning',
                    title: 'No se pudieron obtener los datos.'
                });
            }
        }
        else {
            Toast.fire({
                icon: 'warning',
                title: 'No se obtuvo la confirmación de la edición del stock del producto borrado, no se puede proceder.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
