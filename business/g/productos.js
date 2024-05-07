//ROUTES
const productosRoute = 'https://coreapimrperez.somee.com/api/Productos';
const carritoRoute = 'https://coreapimrperez.somee.com/api/Carrito';
const carritoPorUsuarioRoute = 'https://coreapimrperez.somee.com/api/Carrito/FilterByUser/';
const productosFiltroRoute = 'https://coreapimrperez.somee.com/api/Productos/FiltarProductos';

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
      mostrarProductos(dataObtained);
    }
    try {
      const response = await fetch(productosRoute, requestOptions);
      const dataObtained = await response.json();
      showData(dataObtained);
    } catch (error) {
      console.log("Desconexion con el servidor");
    }
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalCarrito = async () => {
  try {

    let idUsuarioLogueado = sessionStorage.getItem("signInInfo");
    let usuarioInfo = JSON.parse(idUsuarioLogueado);
    let usuarioId = usuarioInfo.usuarioId;
    let rutaCompleta = carritoPorUsuarioRoute + usuarioId;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const showData = (dataObtained) => {
      document.getElementById('cantidadCarrito').innerHTML = dataObtained.cantidadTotalEnCarrito;
    }
    try {
      const response = await fetch(rutaCompleta, requestOptions);
      const dataObtained = await response.json();
      showData(dataObtained);
    } catch (error) {
      console.log("Desconexion con el servidor");
      document.getElementById('cantidadCarrito').innerHTML = '0';
    }
  }
  catch (error) {
    console.log(error);
    document.getElementById('cantidadCarrito').innerHTML = '0';
  }
}


const getProductosPorId = async () => {
  try {

    const urlParams = new URLSearchParams(window.location.search);
    const parametro = urlParams.get('q');
    const urlFinal = productosRoute + '/' + parametro;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const showData = (dataObtained) => {
      mostrarProductosPorId(dataObtained);
    }
    try {
      const response = await fetch(urlFinal, requestOptions);
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


const mostrarProductos = (dataObtained) => {
  try {
    if (dataObtained.cantidadTotalProductos > 0) {
      let bodydata = '';
      for (let i = 0; i < dataObtained.cantidadTotalProductos; i++) {
        bodydata += `
                <div class="col-sm-6 col-md-6 col-lg-3 product-hover position-relative">
                <div class="card shadow">
                  <img src="${dataObtained.productosData[i].imagen}" class="card-img-top" alt="image-product" loading="lazy" width="350" height="350">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-6">
                        <h5>${dataObtained.productosData[i].nombre}</h5>
                      </div>
                      <div class="col-sm-6">
                        <p class="card-text fw-bold text-end m-3">Q<span id="precioUnitario">${dataObtained.productosData[i].precio}</span></p>
                      </div>
                      <div class="col-sm-12">
                        <a href="views/catalog/product.html?q=${dataObtained.productosData[i].productoId}">
                          <p class="card-text fw-bold text-center text-decoration-underline text-dark">Ver información</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a href="views/catalog/product.html?q=${dataObtained.productosData[i].productoId}" title="Información del producto">
                    <i class="fa-solid fa-cart-shopping position-absolute top-50 end-0 me-3 text-white shadow" 
                      style="padding: 2.1vh; background-color: #8f8f8f; border-radius: 50%;"></i>
                  </a>
                </div>
              </div>
                `;
      }
      document.getElementById('DivProductosObtenidos').innerHTML = bodydata;
    }
    else {
      let bodydata = '';
      bodydata += `
                <div class="col-sm-12 col-md-12 col-lg-12 product-hover position-relative">
                <div class="card shadow">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-12 text-center p-5">
                        <h5 class="text-muted">-- No se encontraron productos con estos filtros --</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `;
      document.getElementById('DivProductosObtenidos').innerHTML = bodydata;
    }
  } catch (err) {
    console.log(err);
  }
}


const mostrarProductosPorId = (dataObtained) => {
  try {
    if (dataObtained.productoId > 0) {

      let bodydata = '';
      bodydata += `
                      <div class="col-sm-12 col-md-12 col-lg-6 text-center">
                        <img src="${dataObtained.imagen}" alt="image-product" width="100%">
                      </div>
                      <div class="col-sm-12 col-md-12 col-lg-5 ms-2">
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <p id="LblDisponibleProducto" class="small-stack-style"></p>
                                <h3 class="card-text mt-4 fw-bold" id="LblTituloProducto">${dataObtained.nombre}</h3>
                                <p id="LblMarcaProducto">${dataObtained.marcaNombre}</p>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <h4 class="card-text fw-bold">Q<span id="LblPrecioProducto">${dataObtained.precio}</span></h4>
                                <p class="text-muted mt-3" id="LblDescripcionProducto">${dataObtained.descripcion}</p>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <p>Cantidad</p>
                                <input type="number" class="form-control text-center" value="0" min="1" max="${dataObtained.cantidad}" id="TxtCantidadProducto" oninput="if(parseInt(this.value) > parseInt(${dataObtained.cantidad})) this.value = ${dataObtained.cantidad};">
                                <input type="number" id="TxtCantidadBaseDeDatosProducto" value="${dataObtained.cantidad}" hidden>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                              <div class="col-md-6 mt-4 mb-4">
                                  <a onclick="agregarAlCarritoProducto()"><i class="fa-solid fa-cart-shopping"></i> Añadir al carrito</a>
                              </div>
                              <div class="col-md-6 mt-4 mb-4">
                                  <a href="../../index.html"><i class="fa-solid fa-arrow-left"></i> Regresar</a>
                              </div>
                            </div>
                        </div>
                      </div>
                `;
      document.getElementById('CrdProductoInformacion').innerHTML = bodydata;

      const lblDisponibleProducto = document.getElementById('LblDisponibleProducto');

      if (dataObtained.cantidad === 0) {
        Toast.fire({
          icon: 'warning',
          title: 'Producto sin stock, refresque la página o consulte si hay en reserva.'
        });
        lblDisponibleProducto.innerHTML = 'SIN STOCK';
        lblDisponibleProducto.style.backgroundColor = '#ff4242';
        lblDisponibleProducto.style.color = '#ffffff';
      } else if (dataObtained.cantidad === 1) {
        lblDisponibleProducto.innerHTML = 'SOLAMENTE UNO DISPONIBLE';
        lblDisponibleProducto.style.backgroundColor = '#ffe357';
      } else {
        lblDisponibleProducto.innerHTML = 'DISPONIBLES: ' + dataObtained.cantidad;
        lblDisponibleProducto.style.backgroundColor = '#2bffa0';
      }

    }
    else {
      document.getElementById('CrdProductoInformacion').innerHTML = '';
      Toast.fire({
        icon: 'warning',
        title: 'No se encontró la información para este producto, informe al administrador.'
      });
    }
  } catch (err) {
    console.log(err);
  }
}


const agregarAlCarritoProducto = () => {
  try {

    let tokenDeSesion = sessionStorage.getItem('tkn');
    let cantidad = document.getElementById('TxtCantidadProducto').value;
    let cantidadDb = document.getElementById('TxtCantidadBaseDeDatosProducto').value;
    let precioUnitario = document.getElementById('LblPrecioProducto').innerHTML;
    let nuevaCantidad = parseInt(cantidadDb) - parseInt(cantidad);
    let totalCantidad = parseFloat(precioUnitario) * parseInt(cantidad);

    if (tokenDeSesion == null || tokenDeSesion == undefined || tokenDeSesion == "") {
      Toast.fire({
        icon: 'warning',
        title: 'Para guardar este producto en tu carrito necesitas iniciar sesión previamente.'
      });
    }
    else {
      if (cantidadDb < 1) {
        Toast.fire({
          icon: 'warning',
          title: 'Producto sin stock, no se puede proceder con su compra.'
        });
      }
      else if (cantidad < 1) {
        Toast.fire({
          icon: 'warning',
          title: 'La cantidad no puede ser menor o igual a cero, por favor ingresa un número válido.'
        });
        document.getElementById('TxtCantidadProducto').value = 1;
      }
      else {
        const urlParams = new URLSearchParams(window.location.search);
        const parametro = urlParams.get('q');
        let idUsuarioLogueado = sessionStorage.getItem("signInInfo");
        let usuarioInfo = JSON.parse(idUsuarioLogueado);
        let usuarioId = usuarioInfo.usuarioId;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("tkn"));

        var raw = JSON.stringify({
          "carritoId": 0,
          "productoId": parametro,
          "usuarioId": usuarioId,
          "cantidad": cantidad,
          "totalCantidad": totalCantidad,
          "nuevaCantidadProducto": nuevaCantidad,
          "estado": 1
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(carritoRoute, requestOptions)
          .then(response => response.json())
          .then(dataObtained => showData(dataObtained))
          .catch(error => err = error);

        const showData = (dataObtained) => {
          if (dataObtained.isSuccess === true) {
            try {
              window.location.href = '../../views/cart.html';
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
              title: 'No se pudo completar el proceos, informe al administrador.'
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


const filtrarProductosPorFiltrosInicio = async () => {

  let marcaId = document.getElementById('CboMarcas').value;
  let categoriaId = document.getElementById('CboCategorias').value;
  let generoId = document.getElementById('CboGenero').value;
  let urlComplemento = '?MarcaId=' + marcaId + '&CategoriaId=' + categoriaId + '&GeneroId=' + generoId;

  try {
    if (marcaId == 0 && categoriaId == 0 && generoId == 0) {
      getProductos();
    }
    else {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const showData = (dataObtained) => {
        mostrarProductos(dataObtained);
      }
      try {
        const response = await fetch(productosFiltroRoute + urlComplemento, requestOptions);
        const dataObtained = await response.json();
        showData(dataObtained);
      } catch (error) {
        console.log("Desconexion con el servidor");
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}



//TOAST SWEETALERT2
var Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3200
});