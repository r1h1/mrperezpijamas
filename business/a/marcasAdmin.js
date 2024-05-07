//ROUTES
const MarcasRoute = 'https://coreapimrperez.somee.com/api/Marcas';


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
            mostrarMarcasTabla(dataObtained);
        }
        try {
            const response = await fetch(MarcasRoute, requestOptions);
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
getMarcas();



const agregarMarcas = () => {
    try {
        let nombreMarcas = document.getElementById('nombreMarca').value.trim();
        let proveedorMarcas = document.getElementById('proveedorMarca').value.trim();

        if (nombreMarcas != "" && proveedorMarcas != "") {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "MarcasId": 0,
                    "nombre": nombreMarcas,
                    "proveedor": proveedorMarcas,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(MarcasRoute, requestOptions)
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
                            getMarcas();
                            document.getElementById('nombreMarca').value = '';
                            document.getElementById('proveedorMarca').value = '';
                            document.getElementById('nombreMarca').focus();
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
            document.getElementById('nombreMarca').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarMarcasTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" onclick="editarMarca(${dataObtained[i].marcasId},'${dataObtained[i].nombre}','${dataObtained[i].proveedor}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" onclick="borrarMarca(${dataObtained[i].marcasId},'${dataObtained[i].nombre}','${dataObtained[i].proveedor}')"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].nombre,
                    dataObtained[i].proveedor,
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


const borrarMarca = (marcasId, nombre, proveedor) => {
    try {
        if (marcasId != "" && nombre != "" && proveedor != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "marcasId": marcasId,
                "nombre": nombre,
                "proveedor": proveedor,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(MarcasRoute, requestOptions)
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
                        getMarcas();
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



const editarMarca = (marcasId, nombre, proveedor) => {
    try {
        document.getElementById('idMarca').value = marcasId;
        document.getElementById('nombreMarca').value = nombre;
        document.getElementById('proveedorMarca').value = proveedor;
    }
    catch (error) {
        console.log(error);
    }
}


const editarMarcaLuegoDeEdicion = () => {
    try {
        let IdMarca = document.getElementById('idMarca').value;
        let NombreMarca = document.getElementById('nombreMarca').value;
        let ProveedorMarca = document.getElementById('proveedorMarca').value;

        if (IdMarca != "" && NombreMarca != "" && ProveedorMarca != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "marcasId": IdMarca,
                "nombre": NombreMarca,
                "proveedor": ProveedorMarca,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(MarcasRoute, requestOptions)
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
                        getMarcas();
                        document.getElementById('idMarca').value = '';
                        document.getElementById('nombreMarca').value = '';
                        document.getElementById('proveedorMarca').value = '';
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
    let nombreMarcas = document.getElementById('nombreMarca').value.trim();
    let proveedorMarcas = document.getElementById('proveedorMarca').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreMarcas.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre de marcas solo puede contener letras y números.'
        });
        return false;
    }

    if (!proveedorMarcas.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo proveedor de marcas solo puede contener letras y números.'
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