//ROUTES
const UsuarioRoute = 'https://coreapimrperez.somee.com/api/Usuario';
const OrdenesRoute = 'https://coreapimrperez.somee.com/api/Orden';
const EmpleadoRoute = 'https://coreapimrperez.somee.com/api/Empleado';
const ProductosRoute = 'https://coreapimrperez.somee.com/api/Productos';


const totalCantidadUsuarios = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            document.getElementById('clientesRegistrados').innerHTML = dataObtained.length;
        }
        try {
            const response = await fetch(UsuarioRoute, requestOptions);
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

const totalCantidadOrdenes = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            let countCreadas = 0;
            let countPendientes = 0;
            let countEntregadas = 0;

            for (let i = 0; i < dataObtained.length; i++) {
                if (dataObtained[i].estadoOrden === 1) {
                    countCreadas++;
                } else if (dataObtained[i].estadoOrden === 2) {
                    countPendientes++;
                } else if (dataObtained[i].estadoOrden === 4) {
                    countEntregadas++;
                }
            }

            document.getElementById('ordenesCreadas').innerHTML = countCreadas;
            document.getElementById('ordenesPendientes').innerHTML = countPendientes;
            document.getElementById('ordenesEntregadas').innerHTML = countEntregadas;
        }
        try {
            const response = await fetch(OrdenesRoute, requestOptions);
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

const totalCantidadEmpleados = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            document.getElementById('empleadosRegistrados').innerHTML = dataObtained.length;
        }
        try {
            const response = await fetch(EmpleadoRoute, requestOptions);
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

const totalCantidadProductos = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            document.getElementById('productosCreados').innerHTML = dataObtained.cantidadTotalProductos;
        }
        try {
            const response = await fetch(ProductosRoute, requestOptions);
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


const muestraDashboardInformacion = () => {
    totalCantidadUsuarios();
    totalCantidadOrdenes();
    totalCantidadEmpleados();
    totalCantidadProductos();
}

muestraDashboardInformacion();
setInterval(muestraDashboardInformacion, 5000);