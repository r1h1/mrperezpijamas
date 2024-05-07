//ROUTES
const categoriasRoute = 'https://coreapimrperez.somee.com/api/Orden/FilterByOrderNumber/';
const carritoPorUsuarioRoute = 'https://coreapimrperez.somee.com/api/Carrito/FilterByUser/';


const getOrdenPorNumero = async () => {

    try {
        let numeroOrden = document.getElementById("TxtNumeroOrden").value;
        let rutaCompleta = categoriasRoute + numeroOrden;

        if (numeroOrden == "") {
            Toast.fire({
                icon: 'warning',
                title: 'Ingrese el número de órden a buscar, este no puede ir vacío.'
            });
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
                mostrarInformacionOrden(dataObtained);
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


const trackingSearch = () => {
    document.getElementById("trackingStatus").style.display = "block";
    window.location.href = "#EstadoActual";
}

const displayNoneStatus = () => {
    document.getElementById("trackingStatus").style.display = "none";
    window.location.href = "../../views/shippinginfo.html";
}

const detectarNumeroDeOrdenLleno = () => {

    try {
        let numeroOrden = document.getElementById("TxtNumeroOrden").value;

        if (numeroOrden == "") {
            displayNoneStatus()
        }
        else {
            //NADA
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarInformacionOrden = (dataObtained) => {
    try {
        if (dataObtained.totalCantidad > 0) {

            Toast.fire({
                icon: 'success',
                title: 'Búsqueda de órden exitosa.'
            });

            document.getElementById('numeroSeguimiento').innerHTML = dataObtained.numeroDeOrden;
            document.getElementById('totalCompra').innerHTML = dataObtained.totalCantidad == '' ? 'N/A' : dataObtained.totalCantidad;
            document.getElementById('cantidadCompra').innerHTML = dataObtained.cantidadOrdenada == '' ? 'N/A' : dataObtained.cantidadOrdenada;
            document.getElementById('descripcionCompra').innerHTML = dataObtained.ordenDescripcion == '' ? 'N/A' : dataObtained.ordenDescripcion;
            document.getElementById('fechaPedidoRealizado').innerHTML = dataObtained.fechaPedido == null ? 'Pendiente' : new Date(dataObtained.fechaPedido).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
            document.getElementById('fechaPagoValidado').innerHTML = dataObtained.fechaPago == null ? 'Pendiente' : new Date(dataObtained.fechaPago).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
            document.getElementById('fechaPedidoEnRuta').innerHTML = dataObtained.fechaRuta == null ? 'Pendiente' : new Date(dataObtained.fechaRuta).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
            document.getElementById('fechaPedidoEntregado').innerHTML = dataObtained.fechaEntrega == null ? 'Pendiente' : new Date(dataObtained.fechaEntrega).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

            switch (dataObtained.estadoOrden) {
                case 1:
                    trackingSearch();
                    document.getElementById('iconoPedidoRealizado').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoValidandoPago').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    document.getElementById('iconoPedidoEnRuta').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    document.getElementById('iconoPedidoEntregado').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    break;
                case 2:
                    trackingSearch();
                    document.getElementById('iconoPedidoRealizado').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoValidandoPago').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoPedidoEnRuta').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    document.getElementById('iconoPedidoEntregado').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    break;
                case 3:
                    trackingSearch();
                    document.getElementById('iconoPedidoRealizado').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoValidandoPago').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoPedidoEnRuta').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoPedidoEntregado').style.backgroundColor = 'hsl(0, 0%, 79%)';
                    break;
                case 4:
                    trackingSearch();
                    document.getElementById('iconoPedidoRealizado').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoValidandoPago').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoPedidoEnRuta').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    document.getElementById('iconoPedidoEntregado').style.backgroundColor = 'hsl(46, 100%, 63%)';
                    break;
                default:
                    document.getElementById("trackingStatus").style.display = "none";
                    Toast.fire({
                        icon: 'warning',
                        title: 'La órden está en un estado desconocido, informe al administrador.'
                    });
            }
        }
        else {
            document.getElementById("trackingStatus").style.display = "none";
            Toast.fire({
                icon: 'warning',
                title: 'No se encontró ninguna órden con ese número.'
            });
        }
    } catch (err) {
        console.log(err);
    }
}


const verEstadoOrden = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const numeroOrden = urlParams.get('n');
        if(numeroOrden == ''){
            document.getElementById("TxtNumeroOrden").value = '';
        }
        else{
            document.getElementById("TxtNumeroOrden").value = numeroOrden;
            getOrdenPorNumero();
        }
    }
    catch (error) {
        console.log(error);
    }
}
verEstadoOrden();


//TOAST SWEETALERT2
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3200
});