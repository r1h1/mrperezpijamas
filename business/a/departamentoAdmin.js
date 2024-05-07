//ROUTES
const DepartamentoRoute = 'https://coreapimrperez.somee.com/api/Departamento';
const EmpresaRoute = 'https://coreapimrperez.somee.com/api/Empresa';


const getDepartamento = async () => {
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
            mostrarDepartamentoTabla(dataObtained);
        }
        try {
            const response = await fetch(DepartamentoRoute, requestOptions);
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
getDepartamento();


const agregarDepartamento = () => {
    try {
        let nombreDepartamento = document.getElementById('nombreDepartamento').value.trim();
        let empresaDepartamento = document.getElementById('empresaDepartamento').value;

        if (nombreDepartamento != "" && empresaDepartamento != "0") {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "departamentoId": 0,
                    "nombre": nombreDepartamento,
                    "empresaId": empresaDepartamento,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(DepartamentoRoute, requestOptions)
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
                            getDepartamento();
                            getEmpresa();
                            document.getElementById('nombreDepartamento').value = '';
                            document.getElementById('empresaDepartamento').value = '';
                            document.getElementById('nombreDepartamento').focus();
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
            document.getElementById('nombreDepartamento').focus();
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
                document.getElementById('empresaDepartamento').innerHTML = bodydata;
            }
            else {
                document.getElementById('empresaDepartamento').disabled = true;
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


const mostrarDepartamentoTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" onclick="editarDepartamento(${dataObtained[i].departamentoId},'${dataObtained[i].nombre}','${dataObtained[i].empresaId}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" onclick="borrarDepartamento(${dataObtained[i].departamentoId},'${dataObtained[i].nombre}','${dataObtained[i].empresaId}')"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].nombre,
                    dataObtained[i].nit,
                    dataObtained[i].direccion,
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


const borrarDepartamento = (departamentoId, nombre, empresaId) => {
    try {
        if (departamentoId != "" && nombre != "" && empresaId != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "departamentoId": departamentoId,
                "nombre": nombre,
                "empresaId": empresaId,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(DepartamentoRoute, requestOptions)
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
                        getDepartamento();
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



const editarDepartamento = (departamentoId, nombre, empresaId) => {
    try {
        document.getElementById('idDepartamento').value = departamentoId;
        document.getElementById('nombreDepartamento').value = nombre;
        document.getElementById('empresaDepartamento').value = empresaId;
    }
    catch (error) {
        console.log(error);
    }
}


const editarDepartamentoLuegoDeEdicion = () => {
    try {
        let idDepartamento = document.getElementById('idDepartamento').value;
        let nombreDepartamento = document.getElementById('nombreDepartamento').value;
        let empresaDepartamento = document.getElementById('empresaDepartamento').value;

        if (idDepartamento != "" && nombreDepartamento != "" && empresaDepartamento != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "departamentoId": parseInt(idDepartamento),
                "nombre": nombreDepartamento,
                "empresaId": empresaDepartamento,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(DepartamentoRoute, requestOptions)
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
                        getDepartamento();
                        document.getElementById('idDepartamento').value = '';
                        document.getElementById('nombreDepartamento').value = '';
                        document.getElementById('empresaDepartamento').value = '';
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
    let nombreDepartamento = document.getElementById('nombreDepartamento').value.trim();
    let empresaDepartamento = document.getElementById('empresaDepartamento').value;

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreDepartamento.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre solo puede contener letras y números.'
        });
        return false;
    }

    if (!empresaDepartamento.match(letrasNumeros)) {
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