//ROUTES
const generoRoute = 'https://coreapimrperez.somee.com/api/Genero';


const getGenero = async () => {

    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            mostrarGeneroCbo(dataObtained);
            mostrarGeneroCboProductos(dataObtained);
        }
        try {
            const response = await fetch(generoRoute, requestOptions);
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
getGenero();


const mostrarGeneroCbo = (dataObtained) => {
    try {
        let bodydata = '<option value="0">-- Todos --</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                <option value="${dataObtained[i].generoId}">${dataObtained[i].resumen} - ${dataObtained[i].nombre}</option>
            `;
            }
            document.getElementById('CboGenero').innerHTML = bodydata;
        }
        else {
            document.getElementById('CboGenero').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}



const mostrarGeneroCboProductos = (dataObtained) => {
    try {
        let bodydata = '<option value="0">Seleccione...</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                <option value="${dataObtained[i].generoId}">${dataObtained[i].resumen} - ${dataObtained[i].nombre}</option>
            `;
            }
            document.getElementById('generoProductos').innerHTML = bodydata;
        }
        else {
            document.getElementById('generoProductos').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}