//ROUTES
const ProductosRoute = 'https://coreapimrperez.somee.com/api/Productos';


const getProductos = async () => {

    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const showData = (dataObtained) => {
            mostrarProductosTabla(dataObtained);
            mostrarMarcasCboProductos();
            mostrarGeneroCboProductos();
            mostrarCategoriasCboProductos();
        }
        try {
            const response = await fetch(ProductosRoute, requestOptions);
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
getProductos();



const agregarProductos = () => {
    try {
        let nombreProductos = document.getElementById('nombreProductos').value.trim();
        let descripcionProductos = document.getElementById('descripcionProductos').value.trim();
        let cantidadProductos = document.getElementById('cantidadProductos').value.trim();
        let precioProductos = document.getElementById('precioProductos').value.trim();
        let marcaProductos = document.getElementById('marcaProductos').value;
        let categoriaProductos = document.getElementById('categoriaProductos').value;
        let generoProductos = document.getElementById('generoProductos').value;
        let imagenProductos = document.getElementById('imagenProductosBase64Converted').value;

        if (nombreProductos === "" || descripcionProductos === "" || cantidadProductos === "" ||
            precioProductos === "" || marcaProductos === "0" || categoriaProductos === "0" ||
            generoProductos === "0" || imagenProductos === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Llena todos los campos para continuar.'
            });
            document.getElementById('nombreProductos').focus();
        }
        else {
            if (validacionFormulario()) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

                var raw = JSON.stringify({
                    "productoId": 0,
                    "nombre": nombreProductos,
                    "descripcion": descripcionProductos,
                    "cantidad": cantidadProductos,
                    "precio": precioProductos,
                    "imagen": imagenProductos,
                    "marcaId": marcaProductos,
                    "categoriaId": categoriaProductos,
                    "generoId": generoProductos,
                    "estado": 1
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(ProductosRoute, requestOptions)
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
                            getProductos();
                            document.getElementById('nombreProductos').value = '';
                            document.getElementById('descripcionProductos').value = '';
                            document.getElementById('cantidadProductos').value = '';
                            document.getElementById('precioProductos').value = '';
                            document.getElementById('marcaProductos').value = '';
                            document.getElementById('categoriaProductos').value = '';
                            document.getElementById('generoProductos').value = '';
                            document.getElementById('imagenProductosBase64Converted').value = '';
                            document.getElementById('imagenProductos').value = ''
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
    }
    catch (error) {
        console.log(error);
    }
}


const mostrarProductosTabla = (dataObtained) => {
    try {
        if (dataObtained.cantidadTotalProductos > 0) {
            let table = $('#example1').DataTable();
            table.clear().draw();
            for (let i = 0; i < dataObtained.cantidadTotalProductos; i++) {
                let editarBtn = `<button class="btn btn-warning" data-id="${dataObtained.productosData[i].productoId}"><i class="fa-solid fa-pen-to-square"></i></button>`;
                let borrarBtn = `<button class="btn btn-danger" data-id="${dataObtained.productosData[i].productoId}"><i class="fa-solid fa-trash"></i></button>`;
                let imagenProducto = `<img id="imagenProductoTabla" src="${dataObtained.productosData[i].imagen}" alt="Vista previa de la imagen" style="max-width: 100%; max-height: 60px;">`;
                table.row.add([
                    imagenProducto,
                    dataObtained.productosData[i].nombre,
                    dataObtained.productosData[i].descripcion,
                    dataObtained.productosData[i].cantidad,
                    dataObtained.productosData[i].precio,
                    dataObtained.productosData[i].marcaNombre,
                    dataObtained.productosData[i].nombreCategoria,
                    dataObtained.productosData[i].generoNombre,
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


const validacionFormulario = () => {
    let nombreProductos = document.getElementById('nombreProductos').value.trim();
    let descripcionProductos = document.getElementById('descripcionProductos').value.trim();
    let cantidadProductos = document.getElementById('cantidadProductos').value.trim();
    let precioProductos = document.getElementById('precioProductos').value.trim();
    let marcaProductos = document.getElementById('marcaProductos').value;
    let categoriaProductos = document.getElementById('categoriaProductos').value;
    let generoProductos = document.getElementById('generoProductos').value;
    let imagenProductos = document.getElementById('imagenProductos').value;

    let letrasNumeros = /^[A-Za-z0-9\s]*$/;
    let numeros = /^\d+$/;

    if (!nombreProductos.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo nombre solo puede contener letras y números.'
        });
        return false;
    }

    if (!descripcionProductos.match(letrasNumeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo descripción solo puede contener letras y números.'
        });
        return false;
    }

    if (!cantidadProductos.match(numeros)) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo cantidad solo puede contener números enteros.'
        });
        return false;
    }

    if (parseFloat(precioProductos) <= 0 || parseFloat(precioProductos) > 9999999.99) {
        Toast.fire({
            icon: 'warning',
            title: 'El campo precio debe estar entre 0.01 y 9999999.99.'
        });
        return false;
    }

    if (marcaProductos === "0") {
        Toast.fire({
            icon: 'warning',
            title: 'Selecciona una marca válida.'
        });
        return false;
    }

    if (categoriaProductos === "0") {
        Toast.fire({
            icon: 'warning',
            title: 'Selecciona una categoría válida.'
        });
        return false;
    }

    if (generoProductos === "0") {
        Toast.fire({
            icon: 'warning',
            title: 'Selecciona un género válido.'
        });
        return false;
    }

    if (imagenProductos === "") {
        Toast.fire({
            icon: 'warning',
            title: 'Selecciona una imagen para el producto.'
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