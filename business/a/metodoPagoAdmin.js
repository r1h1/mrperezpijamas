//ROUTES
const MetodosPagoRoute = 'https://coreapimrperez.somee.com/api/MetodosPago';


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
            mostrarMetodosPagoTabla(dataObtained);
        }
        try {
            const response = await fetch(MetodosPagoRoute, requestOptions);
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



const agregarMetodosPago = () => {
    try {
        let nombreMetodosPago = document.getElementById('nombreMetodosPago').value.trim();

        if (nombreMetodosPago != "") {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "metodoPagoId": 0,
                    "nombre": nombreMetodosPago,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(MetodosPagoRoute, requestOptions)
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
                            getMetodosPago();
                            document.getElementById('nombreMetodosPago').value = '';
                            document.getElementById('nombreMetodosPago').focus();
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
        }
        else {
            Toast.fire({
                icon: 'warning',
                title: 'Llena todos los campos para continuar.'
            });
            document.getElementById('nombreMetodosPago').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarMetodosPagoTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" onclick="editarMetodosPago(${dataObtained[i].metodoPagoId},'${dataObtained[i].nombre}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" onclick="borrarMetodosPago(${dataObtained[i].metodoPagoId},'${dataObtained[i].nombre}')"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].nombre,
                    editarBtn,
                    borrarBtn
                ]).draw();
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


const borrarMetodosPago = (metodosPagoId, nombre) => {
    try {
        if (metodosPagoId != "" && nombre != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "metodoPagoId": metodosPagoId,
                "nombre": nombre,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(MetodosPagoRoute, requestOptions)
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
                        getMetodosPago();
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
                title: 'No se pudo obtener el dato a borrar.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}



const editarMetodosPago = (metodosPagoId, nombre) => {
    try {
        document.getElementById('idMetodosPago').value = metodosPagoId;
        document.getElementById('nombreMetodosPago').value = nombre;
    }
    catch (error) {
        console.log(error);
    }
}


const editarMetodosPagoLuegoDeEdicion = () => {
    try {
        let idMetodosPago = document.getElementById('idMetodosPago').value;
        let nombreMetodosPago = document.getElementById('nombreMetodosPago').value;

        if (idMetodosPago != "" && nombreMetodosPago != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "metodoPagoId": idMetodosPago,
                "nombre": nombreMetodosPago,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(MetodosPagoRoute, requestOptions)
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
                        getMetodosPago();
                        document.getElementById('idMetodosPago').value = '';
                        document.getElementById('nombreMetodosPago').value = '';
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
                title: 'Para editar, primero debes seleccionar un registro.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const validacionFormulario = () => {
    let nombreMetodosPago = document.getElementById('nombreMetodosPago').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreMetodosPago.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre de marcas solo puede contener letras y números.'
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