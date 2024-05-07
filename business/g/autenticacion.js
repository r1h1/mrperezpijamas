//ROUTES
const autenticacionRoute = 'https://coreapimrperez.somee.com/Seguridad/Validar';
const usuarioRoute = 'https://coreapimrperez.somee.com/api/Usuario';
const autenticacionAgregarRoute = 'https://coreapimrperez.somee.com/api/Autenticacion';


//GET AND SET TOKEN WITH POST DATA OBTAINED
const signIn = () => {
    try {

        let userObtained = document.getElementById('TxtCorreoElectronico').value.trim();
        let passwordObtained = document.getElementById('TxtClave').value.trim();

        if (userObtained === '' || passwordObtained === '') {
            sessionStorage.removeItem("signInInfo");
            Toast.fire({
                icon: 'warning',
                title: 'Llena los datos para continuar.'
            });
        }
        else {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "usuario": userObtained,
                "clave": passwordObtained
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(autenticacionRoute, requestOptions)
                .then(response => response.json())
                .then(dataObtained => showData(dataObtained))
                .catch(error => err = error);

            const showData = (dataObtained) => {
                if (dataObtained.code === 400) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Datos incorrectos o sin permiso para acceder.'
                    });
                    sessionStorage.removeItem("signInInfo");
                    sessionStorage.removeItem("tkn");
                }
                else {
                    try {
                        sessionStorage.setItem("signInInfo", JSON.stringify(dataObtained));
                        sessionStorage.setItem("tkn", dataObtained.validCreatedToken);
                        if (dataObtained.code === 201 && dataObtained.validCreatedToken != "") {
                            if (dataObtained.empleadoId > 1 && dataObtained.usuarioId === 1) {
                                window.location.href = "../../views/admin/index.html";
                            }
                            if (dataObtained.empleadoId === 1 && dataObtained.usuarioId > 1) {
                                window.location.href = "../../index.html?session=true";
                            }
                        }
                        else {
                            sessionStorage.removeItem("signInInfo");
                            sessionStorage.removeItem("tkn");
                            window.location.href = "../../index.html";
                        }
                    }
                    catch (err) {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Se ha generado un error interno: ' + err
                        });
                        sessionStorage.removeItem("signInInfo");
                        sessionStorage.removeItem("tkn");
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}


const registerUser = () => {
    try {
        let nombres = document.getElementById('TxtNombres').value.trim();
        let apellidos = document.getElementById('TxtApellidos').value.trim();
        let direccion = document.getElementById('TxtDireccion').value.trim();
        let telefono = document.getElementById('TxtTelefono').value.trim();
        let correoElectronico = document.getElementById('TxtCorreoElectronico').value.trim();
        let ciudad = document.getElementById('TxtCiudad').value.trim();
        let nit = document.getElementById('TxtNit').value.trim();
        let municipio = document.getElementById('TxtMunicipio').value.trim();
        let pais = document.getElementById('TxtPais').value.trim();
        let referencia = document.getElementById('TxtReferencia').value.trim();
        let clave = document.getElementById('TxtContraseña').value.trim();

        if (nombres === '' || apellidos === '' || direccion === '' || telefono === '' ||
            correoElectronico === '' || ciudad === '' || municipio === '' || pais === '' || referencia === ''
            || clave === '') {
            Toast.fire({
                icon: 'warning',
                title: 'Llena todos los datos para continuar con el registro.'
            });
        }
        else {

            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify({
                    "usuarioId": 0,
                    "nombreCompleto": nombres + ' ' + apellidos,
                    "direccion": direccion,
                    "telefono": telefono,
                    "email": correoElectronico,
                    "ciudad": ciudad,
                    "municipio": municipio,
                    "pais": pais,
                    "referencia": referencia,
                    "nit": nit,
                    "rolId": 3,
                    "estado": 1
                });

                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(usuarioRoute, requestOptions)
                    .then(response => response.json())
                    .then(dataObtained => showData(dataObtained))
                    .catch(error => err = error);

                const showData = (dataObtained) => {
                    if (dataObtained.isSuccess === true) {
                        try {
                            registerAutenticacion(dataObtained.insertedId);
                        }
                        catch (err) {
                            Toast.fire({
                                icon: 'warning',
                                title: 'Se ha generado un error interno: ' + err
                            });
                        }
                    }
                    else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Se ha generado un error interno.'
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}


const registerAutenticacion = (idUsuarioInsertado) => {
    try {
        let nombres = document.getElementById('TxtNombres').value.trim();
        let apellidos = document.getElementById('TxtApellidos').value.trim();
        let direccion = document.getElementById('TxtDireccion').value.trim();
        let telefono = document.getElementById('TxtTelefono').value.trim();
        let correoElectronico = document.getElementById('TxtCorreoElectronico').value.trim();
        let ciudad = document.getElementById('TxtCiudad').value.trim();
        let municipio = document.getElementById('TxtMunicipio').value.trim();
        let pais = document.getElementById('TxtPais').value.trim();
        let referencia = document.getElementById('TxtReferencia').value.trim();
        let clave = document.getElementById('TxtContraseña').value.trim();

        if (
            nombres === '' ||
            apellidos === '' ||
            direccion === '' ||
            telefono === '' ||
            correoElectronico === '' ||
            ciudad === '' ||
            municipio === '' ||
            pais === '' ||
            referencia === '' ||
            clave === ''
        ) {
            Toast.fire({
                icon: 'warning',
                title: 'Llena todos los datos para continuar con el registro.'
            });
        } else {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify({
                    "autenticacionId": 0,
                    "usuarioId": idUsuarioInsertado,
                    "empleadoId": 1,
                    "usuario": correoElectronico,
                    "clave": clave,
                    "token": "",
                    "estado": 1
                });

                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(autenticacionAgregarRoute, requestOptions)
                    .then(response => response.json())
                    .then(dataObtained => showData(dataObtained))
                    .catch(error => err = error);

                const showData = (dataObtained) => {
                    if (dataObtained.isSuccess === true) {
                        try {
                            window.location.href = "../../views/login.html?r=true";
                        }
                        catch (err) {
                            Toast.fire({
                                icon: 'warning',
                                title: 'Se ha generado un error interno: ' + err
                            });
                        }
                    }
                    else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Se ha generado un error interno.'
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const validacionFormulario = () => {
    let nombres = document.getElementById("TxtNombres").value.trim();
    let apellidos = document.getElementById("TxtApellidos").value.trim();
    let ciudad = document.getElementById("TxtCiudad").value.trim();
    let municipio = document.getElementById("TxtMunicipio").value.trim();
    let pais = document.getElementById("TxtPais").value.trim();
    let direccion = document.getElementById("TxtDireccion").value.trim();
    let nit = document.getElementById("TxtNit").value.trim();
    let referencia = document.getElementById("TxtReferencia").value.trim();
    let contraseña = document.getElementById("TxtContraseña").value.trim();
    let telefono = document.getElementById("TxtTelefono").value.trim();
    let correo = document.getElementById("TxtCorreoElectronico").value.trim();

    let letrasNumerosArroba = /^[A-Za-z0-9@._\s\-#]*$/;
    let soloLetras = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]*$/;
    let soloNumeros = /^[0-9]*$/;

    if (!nombres.match(soloLetras)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombres solo puede contener letras.'
        });
        return false;
    }

    if (!apellidos.match(soloLetras)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo apellidos solo puede contener letras.'
        });
        return false;
    }

    if (!ciudad.match(soloLetras)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo ciudad solo puede contener letras.'
        });
        return false;
    }

    if (!municipio.match(soloLetras)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo municipio solo puede contener letras.'
        });
        return false;
    }

    if (!pais.match(soloLetras)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo país solo puede contener letras.'
        });
        return false;
    }

    if (!direccion.match(letrasNumerosArroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo dirección solo puede contener números y letras.'
        });
        return false;
    }

    if (!nit.match(letrasNumerosArroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nit solo puede contener números y letras.'
        });
        return false;
    }

    if (!referencia.match(letrasNumerosArroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo referencia solo puede contener letras, números y caracteres especiales básicos.'
        });
        return false;
    }

    if (!contraseña.match(letrasNumerosArroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo contraseña solo puede contener letras, números y caracteres especiales básicos.'
        });
        return false;
    }

    if (!telefono.match(soloNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo teléfono solo puede contener números.'
        });
        return false;
    }

    if (!correo.match(letrasNumerosArroba)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo correo electrónico solo puede contener letras, números y caracteres especiales básicos.'
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


const urlParams = new URLSearchParams(window.location.search);
const parametro = urlParams.get('r');

if (parametro) {
    Toast.fire({
        icon: 'success',
        title: 'Usuario registrado con éxito, inicia sesión.'
    });
}