//ROUTES
const marcasRoute = 'https://coreapimrperez.somee.com/api/Marcas';


const getMarcas = async () => {
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            mostrarMarcasCbo(dataObtained);
            mostrarMarcasCboProductos(dataObtained);
        }
        try {
            const response = await fetch(marcasRoute, requestOptions);
            const dataObtained = await response.json();
            showData(dataObtained);
        } catch (error) {
            console.log("Desconexion con el servidor");
        }
    }
    catch (error) {
        console.log(error);
    }
}
getMarcas();


const mostrarMarcasCbo = (dataObtained) => {
    try {
        let bodydata = '<option value="0">-- Todos --</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                    <option value="${dataObtained[i].marcasId}">${dataObtained[i].nombre}</option>
                `;
            }
            document.getElementById('CboMarcas').innerHTML = bodydata;
        }
        else {
            document.getElementById('CboMarcas').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}


const mostrarMarcasCboProductos = (dataObtained) => {
    try {
        let bodydata = '<option value="0">Seleccione...</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                    <option value="${dataObtained[i].marcasId}">${dataObtained[i].nombre}</option>
                `;
            }
            document.getElementById('marcaProductos').innerHTML = bodydata;
        }
        else {
            document.getElementById('marcaProductos').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}