//ROUTES
const UsuarioRoute = 'https://coreapimrperez.somee.com/api/Usuario';
const AutenticacionAgregarRoute = 'https://coreapimrperez.somee.com/api/Autenticacion';

const getUsuario = async () => {
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
            mostrarUsuarioTabla(dataObtained);
            let bodydata = '';
            for (let i = 0; i < dataObtained.length; i++) {
                if (dataObtained[i].usuarioId === 1) {
                    continue;
                }
                else {
                    bodydata += `
                    <option value="${dataObtained[i].usuarioId}">${dataObtained[i].email}</option>
                `;
                }
            }
            document.getElementById('usuarioUsuario').innerHTML = bodydata;
            document.getElementById('usuarioUsuario').selectedIndex = 0;
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
getUsuario();


const agregarUsuario = () => {
    try {
        let nombreCompletoUsuario = document.getElementById('nombreCompletoUsuario').value.trim();
        let direccionUsuario = document.getElementById('direccionUsuario').value.trim();
        let telefonoUsuario = document.getElementById('telefonoUsuario').value.trim();
        let correoElectronicoUsuario = document.getElementById('correoElectronicoUsuario').value.trim();
        let ciudadUsuario = document.getElementById('ciudadUsuario').value.trim();
        let municipioUsuario = document.getElementById('municipioUsuario').value.trim();
        let paisUsuario = document.getElementById('paisUsuario').value.trim();
        let nitUsuario = document.getElementById('nitUsuario').value.trim();
        let referenciaUsuario = document.getElementById('referenciaUsuario').value.trim();

        if (
            nombreCompletoUsuario !== "" &&
            direccionUsuario !== "" &&
            telefonoUsuario !== "" &&
            correoElectronicoUsuario !== "" &&
            ciudadUsuario !== "" &&
            municipioUsuario !== "" &&
            paisUsuario !== "" &&
            nitUsuario !== "" &&
            referenciaUsuario !== ""
        ) {

            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "usuarioId": 0,
                    "nombreCompleto": nombreCompletoUsuario,
                    "direccion": direccionUsuario,
                    "telefono": telefonoUsuario,
                    "email": correoElectronicoUsuario,
                    "ciudad": ciudadUsuario,
                    "municipio": municipioUsuario,
                    "pais": paisUsuario,
                    "referencia": referenciaUsuario,
                    "nit": nitUsuario,
                    "rolId": 3,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(UsuarioRoute, requestOptions)
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
                            getUsuario();
                            document.getElementById('nombreCompletoUsuario').value = '';
                            document.getElementById('direccionUsuario').value = '';
                            document.getElementById('telefonoUsuario').value = '';
                            document.getElementById('correoElectronicoUsuario').value = '';
                            document.getElementById('ciudadUsuario').value = '';
                            document.getElementById('municipioUsuario').value = '';
                            document.getElementById('paisUsuario').value = '';
                            document.getElementById('nitUsuario').value = '';
                            document.getElementById('referenciaUsuario').value = '';
                            document.getElementById('nombreCompletoUsuario').focus();
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
            document.getElementById('nombreCompletoUsuario').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const darAccesoUsuario = () => {
    try {
        let usuarioUsuario = document.getElementById('usuarioUsuario').value;
        let usuarioSelect = document.getElementById('usuarioUsuario');
        let claveUsuario = document.getElementById('claveUsuario').value.trim();
        let nombreSeleccionado = usuarioSelect.options[usuarioSelect.selectedIndex].textContent.trim();

        if (
            usuarioUsuario !== "" &&
            claveUsuario !== ""
        ) {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "autenticacionId": 0,
                "usuarioId": parseInt(usuarioUsuario),
                "empleadoId": 1,
                "usuario": nombreSeleccionado,
                "clave": claveUsuario,
                "token": "",
                "estado": 1
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(AutenticacionAgregarRoute, requestOptions)
                .then(response => response.json())
                .then(dataObtained => showData(dataObtained))
                .catch(error => err = error);

            const showData = (dataObtained) => {
                if (dataObtained.isSuccess === true) {
                    try {
                        getUsuario();
                        Toast.fire({
                            icon: 'success',
                            title: 'Completado con éxito.'
                        });
                        document.getElementById('usuarioUsuario').value = 1;
                        document.getElementById('claveUsuario').value = '';
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
                title: 'Llena todos los campos para continuar.'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarUsuarioTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                if (dataObtained[i].usuarioId === 1) {
                    continue;
                }
                else {
                    let editarBtn = `<button class="btn btn-warning" onclick="editarUsuario(${dataObtained[i].usuarioId},'${dataObtained[i].nombreCompleto}',
                    '${dataObtained[i].direccion}','${dataObtained[i].telefono}','${dataObtained[i].email}','${dataObtained[i].ciudad}','${dataObtained[i].municipio}',
                    '${dataObtained[i].pais}','${dataObtained[i].referencia}','${dataObtained[i].nit}',${dataObtained[i].rolId})"><i class="fa-solid fa-pen-to-square"></i></button>`;
                    let borrarBtn = `<button class="btn btn-danger" onclick="borrarUsuario(${dataObtained[i].usuarioId},'${dataObtained[i].nombreCompleto}',
                    '${dataObtained[i].direccion}','${dataObtained[i].telefono}','${dataObtained[i].email}','${dataObtained[i].ciudad}','${dataObtained[i].municipio}',
                    '${dataObtained[i].pais}','${dataObtained[i].referencia}','${dataObtained[i].nit}',${dataObtained[i].rolId})"><i class="fa-solid fa-trash"></i></button>`;
                    table.row.add([
                        dataObtained[i].nombreCompleto,
                        dataObtained[i].direccion,
                        dataObtained[i].telefono,
                        dataObtained[i].email,
                        dataObtained[i].ciudad,
                        dataObtained[i].municipio,
                        dataObtained[i].pais,
                        dataObtained[i].referencia,
                        dataObtained[i].nit,
                        editarBtn,
                        borrarBtn
                    ]).draw();
                }
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


const borrarUsuario = (usuarioId, nombreCompleto, direccion, telefono, email, ciudad, municipio, pais, referencia, nit, rolId) => {
    try {
        if (usuarioId != "" && nombreCompleto != "" && direccion != ""
            && telefono != "" && email != "" && ciudad != ""
            && municipio != "" && pais != "" && referencia != "" && nit != ""
            && rolId != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "usuarioId": usuarioId,
                "nombreCompleto": nombreCompleto,
                "direccion": direccion,
                "telefono": telefono,
                "email": email,
                "ciudad": ciudad,
                "municipio": municipio,
                "pais": pais,
                "referencia": referencia,
                "nit": nit,
                "rolId": rolId,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(UsuarioRoute, requestOptions)
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
                        getUsuario();
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



const editarUsuario = (usuarioId, nombreCompleto, direccion, telefono, email, ciudad, municipio, pais, referencia, nit, rolId) => {
    try {
        document.getElementById('idUsuario').value = usuarioId;
        document.getElementById('nombreCompletoUsuario').value = nombreCompleto;
        document.getElementById('direccionUsuario').value = direccion;
        document.getElementById('telefonoUsuario').value = telefono;
        document.getElementById('correoElectronicoUsuario').value = email;
        document.getElementById('ciudadUsuario').value = ciudad;
        document.getElementById('municipioUsuario').value = municipio;
        document.getElementById('paisUsuario').value = pais;
        document.getElementById('nitUsuario').value = nit;
        document.getElementById('referenciaUsuario').value = referencia;
        document.getElementById('rolUsuario').value = rolId;
    }
    catch (error) {
        console.log(error);
    }
}


const editarUsuarioLuegoDeEdicion = () => {
    try {
        let usuarioId = document.getElementById('idUsuario').value;
        let nombreCompleto = document.getElementById('nombreCompletoUsuario').value;
        let direccionUsuario = document.getElementById('direccionUsuario').value;
        let telefonoUsuario = document.getElementById('telefonoUsuario').value;
        let correoElectronicoUsuario = document.getElementById('correoElectronicoUsuario').value;
        let ciudadUsuario = document.getElementById('ciudadUsuario').value;
        let municipioUsuario = document.getElementById('municipioUsuario').value;
        let paisUsuario = document.getElementById('paisUsuario').value;
        let nitUsuario = document.getElementById('nitUsuario').value;
        let referenciaUsuario = document.getElementById('referenciaUsuario').value;
        let rolUsuario = document.getElementById('rolUsuario').value;

        if (usuarioId != "" && nombreCompleto != "" && direccionUsuario != ""
            && telefonoUsuario != "" && correoElectronicoUsuario != "" && ciudadUsuario != ""
            && municipioUsuario != "" && paisUsuario != "" && referenciaUsuario != "" && nitUsuario != ""
            && rolUsuario != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "usuarioId": usuarioId,
                "nombreCompleto": nombreCompleto,
                "direccion": direccionUsuario,
                "telefono": telefonoUsuario,
                "email": correoElectronicoUsuario,
                "ciudad": ciudadUsuario,
                "municipio": municipioUsuario,
                "pais": paisUsuario,
                "referencia": referenciaUsuario,
                "nit": nitUsuario,
                "rolId": rolUsuario,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(UsuarioRoute, requestOptions)
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
                        getUsuario();
                        document.getElementById('idUsuario').value = '';
                        document.getElementById('nombreCompletoUsuario').value = '';
                        document.getElementById('direccionUsuario').value = '';
                        document.getElementById('telefonoUsuario').value = '';
                        document.getElementById('correoElectronicoUsuario').value = '';
                        document.getElementById('ciudadUsuario').value = '';
                        document.getElementById('municipioUsuario').value = '';
                        document.getElementById('paisUsuario').value = '';
                        document.getElementById('nitUsuario').value = '';
                        document.getElementById('referenciaUsuario').value = '';
                        document.getElementById('rolUsuario').value = '';
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
    let usuarioUsuario = document.getElementById('usuarioUsuario').value.trim();
    let claveUsuario = document.getElementById('claveUsuario').value.trim();

    let letrasNumerosAroba = /^[A-Za-z0-9@\s._-]*$/;

    if (!usuarioUsuario.match(letrasNumerosAroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo usuario solo puede contener letras y números.'
        });
        return false;
    }

    if (!claveUsuario.match(letrasNumerosAroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo clave solo puede contener letras y números.'
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