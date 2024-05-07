//ROUTES
const GeneroRoute = 'https://coreapimrperez.somee.com/api/Genero';


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
            mostrarGenerosTabla(dataObtained);
        }
        try {
            const response = await fetch(GeneroRoute, requestOptions);
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



const agregarGenero = () => {
    try {
        let nombreGenero = document.getElementById('nombreGenero').value.trim();
        let resumenGenero = document.getElementById('resumenGenero').value.trim();

        if (nombreGenero != "" && resumenGenero != "") {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "generoId": 0,
                    "nombre": nombreGenero,
                    "resumen": resumenGenero,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(GeneroRoute, requestOptions)
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
                            getGenero();
                            document.getElementById('nombreGenero').value = '';
                            document.getElementById('resumenGenero').value = '';
                            document.getElementById('nombreGenero').focus();
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
            document.getElementById('nombreGenero').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarGenerosTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" onclick="editarGenero(${dataObtained[i].generoId},'${dataObtained[i].nombre}','${dataObtained[i].resumen}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" onclick="borrarGenero(${dataObtained[i].generoId},'${dataObtained[i].nombre}','${dataObtained[i].resumen}')"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].nombre,
                    dataObtained[i].resumen,
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


const borrarGenero = (generoId, nombre, resumen) => {
    try {
        if (generoId != "" && nombre != "" && resumen != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "generoId": generoId,
                "nombre": nombre,
                "resumen": resumen,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(GeneroRoute, requestOptions)
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
                        getGenero();
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



const editarGenero = (generoId, nombre, resumen) => {
    try {
        document.getElementById('idGenero').value = generoId;
        document.getElementById('nombreGenero').value = nombre;
        document.getElementById('resumenGenero').value = resumen;
    }
    catch (error) {
        console.log(error);
    }
}


const editarGeneroLuegoDeEdicion = () => {
    try {
        let idGenero = document.getElementById('idGenero').value;
        let nombreGenero = document.getElementById('nombreGenero').value;
        let resumenGenero = document.getElementById('resumenGenero').value;

        if (idGenero != "" && nombreGenero != "" && resumenGenero != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "generoId": idGenero,
                "nombre": nombreGenero,
                "resumen": resumenGenero,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(GeneroRoute, requestOptions)
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
                        getGenero();
                        document.getElementById('idGenero').value = '';
                        document.getElementById('nombreGenero').value = '';
                        document.getElementById('resumenGenero').value = '';
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
    let nombreGenero = document.getElementById('nombreGenero').value.trim();
    let resumenGenero = document.getElementById('resumenGenero').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreGenero.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre de marcas solo puede contener letras y números.'
        });
        return false;
    }

    if (!resumenGenero.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo resumen de marcas solo puede contener letras y números.'
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