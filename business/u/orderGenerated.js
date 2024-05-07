//ROUTES
const carritoPorUsuarioRoute = 'https://coreapimrperez.somee.com/api/Carrito/FilterByUser/';

const mostrarDatosDeLaOrdenGenerada = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const numeroOrden = urlParams.get('n');
        const cantidadTotal = urlParams.get('q');
        document.getElementById('LblNumeroSeguimiento').innerHTML = numeroOrden;
        document.getElementById('LblTotalCantidad').innerHTML = cantidadTotal;
    }
    catch (error) {
        console.log(error);
    }
}
mostrarDatosDeLaOrdenGenerada();


const verEstadoOrden = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const numeroOrden = urlParams.get('n');
        window.location.href = 'shippinginfo.html?n=' + numeroOrden;
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