//ROUTES
const EmpleadoRoute = 'https://coreapimrperez.somee.com/api/Empleado';
const EmpresaRoute = 'https://coreapimrperez.somee.com/api/Empresa';
const RolRoute = 'https://coreapimrperez.somee.com/api/Rol';
const AutenticacionAgregarRoute = 'https://coreapimrperez.somee.com/api/Autenticacion';


const getEmpleado = async () => {
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
            mostrarEmpleadoTabla(dataObtained);
            let bodydata = '';
            for (let i = 0; i < dataObtained.length; i++) {
                if (dataObtained[i].empleadoId === 1) {
                    continue;
                }
                else {
                    bodydata += `
                    <option value="${dataObtained[i].empleadoId}">${dataObtained[i].email}</option>
                `;
                }
            }
            document.getElementById('usuarioEmpleado').innerHTML = bodydata;
            document.getElementById('usuarioEmpleado').selectedIndex = 0;
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
getEmpleado();


const agregarEmpleado = () => {
    try {
        let nombreCompletoEmpleado = document.getElementById('nombreCompletoEmpleado').value.trim();
        let direccionEmpleado = document.getElementById('direccionEmpleado').value.trim();
        let telefonoEmpleado = document.getElementById('telefonoEmpleado').value.trim();
        let correoElectronicoEmpleado = document.getElementById('correoElectronicoEmpleado').value.trim();
        let ciudadEmpleado = document.getElementById('ciudadEmpleado').value.trim();
        let municipioEmpleado = document.getElementById('municiplioEmpleado').value.trim();
        let paisEmpleado = document.getElementById('paisEmpleado').value.trim();
        let sexoEmpleado = document.getElementById('sexoEmpleado').value.trim();
        let dpiEmpleado = document.getElementById('dpiEmpleado').value.trim();
        let nitEmpleado = document.getElementById('nitEmpleado').value.trim();
        let rolEmpleado = document.getElementById('rolEmpleado').value.trim();
        let empresaEmpleado = document.getElementById('empresaEmpleado').value.trim();

        if (
            nombreCompletoEmpleado !== "" &&
            direccionEmpleado !== "" &&
            telefonoEmpleado !== "" &&
            correoElectronicoEmpleado !== "" &&
            ciudadEmpleado !== "" &&
            municipioEmpleado !== "" &&
            paisEmpleado !== "" &&
            sexoEmpleado !== "0" &&
            dpiEmpleado !== "" &&
            nitEmpleado !== "" &&
            rolEmpleado !== "0" &&
            empresaEmpleado !== "0"
        ) {

            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "empleadoId": 0,
                    "nombreCompleto": nombreCompletoEmpleado,
                    "direccion": direccionEmpleado,
                    "telefono": telefonoEmpleado,
                    "email": correoElectronicoEmpleado,
                    "ciudad": ciudadEmpleado,
                    "municipio": municipioEmpleado,
                    "pais": paisEmpleado,
                    "sexo": sexoEmpleado,
                    "dpi": dpiEmpleado,
                    "nit": nitEmpleado,
                    "rolId": rolEmpleado,
                    "empresaId": empresaEmpleado,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(EmpleadoRoute, requestOptions)
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
                            getEmpleado();
                            getEmpresa();
                            getRol();
                            document.getElementById('nombreCompletoEmpleado').value = '';
                            document.getElementById('direccionEmpleado').value = '';
                            document.getElementById('telefonoEmpleado').value = '';
                            document.getElementById('correoElectronicoEmpleado').value = '';
                            document.getElementById('ciudadEmpleado').value = '';
                            document.getElementById('municiplioEmpleado').value = '';
                            document.getElementById('paisEmpleado').value = '';
                            document.getElementById('sexoEmpleado').value = 0;
                            document.getElementById('dpiEmpleado').value = '';
                            document.getElementById('nitEmpleado').value = '';
                            document.getElementById('rolEmpleado').value = '';
                            document.getElementById('empresaEmpleado').value = '';
                            document.getElementById('nombreCompletoEmpleado').focus();
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
            document.getElementById('nombreEmpleado').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const darAccesoEmpleado = () => {
    try {
        let usuarioEmpleado = document.getElementById('usuarioEmpleado').value;
        let empleadoSelect = document.getElementById('usuarioEmpleado');
        let claveEmpleado = document.getElementById('claveEmpleado').value.trim();
        let nombreSeleccionado = empleadoSelect.options[empleadoSelect.selectedIndex].textContent.trim();

        if (
            usuarioEmpleado !== "" &&
            claveEmpleado !== ""
        ) {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "autenticacionId": 0,
                "usuarioId": 1,
                "empleadoId": parseInt(usuarioEmpleado),
                "usuario": nombreSeleccionado,
                "clave": claveEmpleado,
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
                        getEmpleado();
                        Toast.fire({
                            icon: 'success',
                            title: 'Completado con éxito.'
                        });
                        document.getElementById('usuarioEmpleado').value = 1;
                        document.getElementById('claveEmpleado').value = '';
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


const getEmpresa = async () => {
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
            let bodydata = '<option value="0">Seleccione...</option>'; // Agregar el primer valor
            if (dataObtained.length > 0) {
                for (let i = 0; i < dataObtained.length; i++) {
                    bodydata += `
                    <option value="${dataObtained[i].empresaId}">${dataObtained[i].nit}</option>
                `;
                }
                document.getElementById('empresaEmpleado').innerHTML = bodydata;
            }
            else {
                document.getElementById('empresaEmpleado').disabled = true;
            }
        }
        try {
            const response = await fetch(EmpresaRoute, requestOptions);
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
getEmpresa();


const getRol = async () => {
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
            let bodydata = '<option value="0">Seleccione...</option>'; // Agregar el primer valor
            if (dataObtained.length > 0) {
                for (let i = 0; i < dataObtained.length; i++) {
                    if (dataObtained[i].rolId === 3) {
                        continue;
                    }
                    else {
                        bodydata += `
                                        <option value="${dataObtained[i].rolId}">${dataObtained[i].nombre}</option>
                                    `;
                    }
                }
                document.getElementById('rolEmpleado').innerHTML = bodydata;
            }
            else {
                document.getElementById('rolEmpleado').disabled = true;
            }
        }
        try {
            const response = await fetch(RolRoute, requestOptions);
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
getRol();


const mostrarEmpleadoTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                if (dataObtained[i].empleadoId === 1) {
                    continue;
                }
                else {
                    let editarBtn = `<button class="btn btn-warning" data-id="${dataObtained[i].id}"><i class="fa-solid fa-pen-to-square"></i></button>`;
                    let borrarBtn = `<button class="btn btn-danger" data-id="${dataObtained[i].id}"><i class="fa-solid fa-trash"></i></button>`;
                    table.row.add([
                        dataObtained[i].nombreCompleto,
                        dataObtained[i].direccion,
                        dataObtained[i].telefono,
                        dataObtained[i].email,
                        dataObtained[i].ciudad,
                        dataObtained[i].municipio,
                        dataObtained[i].pais,
                        dataObtained[i].sexo == 1 ? 'Hombre' : 'Mujer',
                        dataObtained[i].dpi,
                        dataObtained[i].nit,
                        dataObtained[i].rolId == 1 ? 'Super Administrador' : dataObtained[i].rolId == 2 ? 'Administrador' : dataObtained[i].rolId == 3 ? 'Usuario' : 'Desconocido',
                        dataObtained[i].empresaId,
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


const validacionFormulario = () => {
    let nombreCompletoEmpleado = document.getElementById('nombreCompletoEmpleado').value.trim();
    let direccionEmpleado = document.getElementById('direccionEmpleado').value.trim();
    let telefonoEmpleado = document.getElementById('telefonoEmpleado').value.trim();
    let correoElectronicoEmpleado = document.getElementById('correoElectronicoEmpleado').value.trim();
    let ciudadEmpleado = document.getElementById('ciudadEmpleado').value.trim();
    let municipioEmpleado = document.getElementById('municiplioEmpleado').value.trim();
    let paisEmpleado = document.getElementById('paisEmpleado').value.trim();
    let sexoEmpleado = document.getElementById('sexoEmpleado').value.trim();
    let dpiEmpleado = document.getElementById('dpiEmpleado').value.trim();
    let nitEmpleado = document.getElementById('nitEmpleado').value.trim();
    let rolEmpleado = document.getElementById('rolEmpleado').value.trim();
    let empresaEmpleado = document.getElementById('empresaEmpleado').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;
    let letrasNumerosAroba = /^[A-Za-z0-9@\s._-]*$/;

    if (!nombreCompletoEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre completo solo puede contener letras y números.'
        });
        return false;
    }

    if (!direccionEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo dirección solo puede contener letras y números.'
        });
        return false;
    }

    if (!telefonoEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo teléfono solo puede contener letras y números.'
        });
        return false;
    }

    if (!correoElectronicoEmpleado.match(letrasNumerosAroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo correo electrónico solo puede contener arroba, guión bajo, guión, punto, letras y números.'
        });
        return false;
    }

    if (!ciudadEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo ciudad solo puede contener letras y números.'
        });
        return false;
    }

    if (!municipioEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo municipio solo puede contener letras y números.'
        });
        return false;
    }

    if (!paisEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo país solo puede contener letras y números.'
        });
        return false;
    }

    if (!sexoEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo sexo solo puede contener letras y números.'
        });
        return false;
    }

    if (!dpiEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo DPI solo puede contener letras y números.'
        });
        return false;
    }

    if (!nitEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo NIT solo puede contener letras y números.'
        });
        return false;
    }

    if (!rolEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo rol solo puede contener letras y números.'
        });
        return false;
    }

    if (!empresaEmpleado.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo empresa solo puede contener letras y números.'
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