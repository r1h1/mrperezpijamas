//ROUTES
const CategoriasRoute = 'https://coreapimrperez.somee.com/api/Categorias';


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
            mostrarCategoriasTabla(dataObtained);
        }
        try {
            const response = await fetch(CategoriasRoute, requestOptions);
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



const agregarCategorias = () => {
    try {
        let nombreCategorias = document.getElementById('nombreCategorias').value.trim();
        let descripcionCategorias = document.getElementById('descripcionCategorias').value.trim();

        if (nombreCategorias != "" && descripcionCategorias != "") {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "categoriasId": 0,
                    "nombre": nombreCategorias,
                    "descripcion": descripcionCategorias,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(CategoriasRoute, requestOptions)
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
                            getCategorias();
                            document.getElementById('nombreCategorias').value = '';
                            document.getElementById('descripcionCategorias').value = '';
                            document.getElementById('nombreCategorias').focus();
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
            document.getElementById('nombreCategorias').focus();
        }
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarCategoriasTabla = (dataObtained) => {
    try {
        if (dataObtained.length > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.length; i++) {
                let editarBtn = `<button class="btn btn-warning" onclick="editarCategoria(${dataObtained[i].categoriaId},'${dataObtained[i].nombre}','${dataObtained[i].descripcion}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" onclick="borrarCategoria(${dataObtained[i].categoriaId},'${dataObtained[i].nombre}','${dataObtained[i].descripcion}')"><i class="fa-solid fa-trash"></i></button>`;
                table.row.add([
                    dataObtained[i].nombre,
                    dataObtained[i].descripcion,
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


const borrarCategoria = (categoriasId, nombre, descripcion) => {
    try {
        if (categoriasId != "" && nombre != "" && descripcion != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "categoriaId": categoriasId,
                "nombre": nombre,
                "descripcion": descripcion,
                "estado": 0
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(CategoriasRoute, requestOptions)
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
                        getCategorias();
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



const editarCategoria = (categoriaId, nombre, descripcion) => {
    try {
        document.getElementById('idCategorias').value = categoriaId;
        document.getElementById('nombreCategorias').value = nombre;
        document.getElementById('descripcionCategorias').value = descripcion;
    }
    catch (error) {
        console.log(error);
    }
}


const editarCategoriaLuegoDeEdicion = () => {
    try {
        let idCategorias = document.getElementById('idCategorias').value;
        let nombreCategorias = document.getElementById('nombreCategorias').value;
        let descripcionCategorias = document.getElementById('descripcionCategorias').value;

        if (idCategorias != "" && nombreCategorias != "" && descripcionCategorias != "") {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

            var raw = JSON.stringify({
                "categoriaId": parseInt(idCategorias),
                "nombre": nombreCategorias,
                "descripcion": descripcionCategorias,
                "estado": 1
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(CategoriasRoute, requestOptions)
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
                        getCategorias();
                        document.getElementById('idCategorias').value = '';
                        document.getElementById('nombreCategorias').value = '';
                        document.getElementById('descripcionCategorias').value = '';
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
    let nombreCategorias = document.getElementById('nombreCategorias').value.trim();
    let descripcionCategorias = document.getElementById('descripcionCategorias').value.trim();

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;

    if (!nombreCategorias.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre de categorias solo puede contener letras y números.'
        });
        return false;
    }

    if (!descripcionCategorias.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo descripcion de categorias solo puede contener letras y números.'
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