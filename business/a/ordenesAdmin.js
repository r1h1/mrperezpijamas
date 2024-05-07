//ROUTES
const OrdenesRoute = 'https://coreapimrperez.somee.com/api/Orden';


const getCategorias = async () => {

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
            mostrarOrdenesTabla(dataObtained);
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
getCategorias();


const mostrarOrdenesTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" data-id="${dataObtained[i].OrdenId}"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" data-id="${dataObtained[i].OrdenId}"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].numeroDeOrden,
                    dataObtained[i].cantidadOrdenada,
                    dataObtained[i].totalCantidad,
                    dataObtained[i].fechaPedido == null ? 'PENDIENTE' : dataObtained[i].fechaPedido,
                    dataObtained[i].fechaPago == null ? 'PENDIENTE' : dataObtained[i].fechaPago,
                    dataObtained[i].fechaRuta == null ? 'PENDIENTE' : dataObtained[i].fechaRuta,
                    dataObtained[i].fechaEntrega == null ? 'PENDIENTE' : dataObtained[i].fechaEntrega,
                    dataObtained[i].estadoOrden == 1 ? 'PEDIDA' : dataObtained[i].estadoOrden == 2 ? 'PAGADA' : dataObtained[i].estadoOrden == 3 ? 'EN RUTA' : dataObtained[i].estadoOrden == 4 ? 'ENTREGADO' : 'DESCONOCIDO',
                    dataObtained[i].ciudad,
                    dataObtained[i].direccionUsuario,
                    dataObtained[i].emailUsuario,
                    dataObtained[i].municipio,
                    dataObtained[i].pais,
                    dataObtained[i].nit,
                    dataObtained[i].nombreUsuario,
                    dataObtained[i].referencia,
                    dataObtained[i].telefono,
                    editarBtn,
                    borrarBtn
                ]).draw();
                console.log(dataObtained);
            }
        } else {
            // Si no hay datos, deshabilitar la tabla
            $('#example1').DataTable().clear().draw();
            document.getElementById('example1').disabled = true;
        }
    } catch (err) {
        console.log(err);
    }
}


const validacionFormulario = () => {
    let nombreCategorias = document.getElementById('nombreCategorias').value.trim();
    let descripcionCategorias = document.getElementById('descripcionCategorias').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreCategorias.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre de marcas solo puede contener letras y números.'
        });
        return false;
    }

    if (!descripcionCategorias.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo descripcion de marcas solo puede contener letras y números.'
        });
        return false;
    }

    return true;
}


//TOAST SWEETALERT2
let Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3200
});