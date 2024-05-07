//ROUTES
const categoriasRoute = 'https://coreapimrperez.somee.com/api/Categorias';


const getCategorias = async () => {

    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            mostrarCategoriasCbo(dataObtained);
            mostrarCategoriasCboProductos(dataObtained);
        }
        try {
            const response = await fetch(categoriasRoute, requestOptions);
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
getCategorias();


const mostrarCategoriasCbo = (dataObtained) => {
    try {
        let bodydata = '<option value="0">-- Todos --</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                    <option value="${dataObtained[i].categoriaId}">${dataObtained[i].nombre}</option>
                `;
            }
            document.getElementById('CboCategorias').innerHTML = bodydata;
        }
        else {
            document.getElementById('CboCategorias').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}


const mostrarCategoriasCboProductos = (dataObtained) => {
    try {
        let bodydata = '<option value="0">Seleccione...</option>'; // Agregar el primer valor
        if (dataObtained.length > 0) {
            for (let i = 0; i < dataObtained.length; i++) {
                bodydata += `
                    <option value="${dataObtained[i].categoriaId}">${dataObtained[i].nombre}</option>
                `;
            }
            document.getElementById('categoriaProductos').innerHTML = bodydata;
        }
        else {
            document.getElementById('categoriaProductos').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}