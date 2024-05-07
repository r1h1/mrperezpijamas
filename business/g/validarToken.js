
const validarExpiracionToken = (rutaLogin, rutaInicio) => {
    try {
        const token = sessionStorage.getItem("tkn");

        if (!token) {
            // Si no hay token, mostramos un mensaje y redirigimos al usuario
            sessionStorage.removeItem("signInInfo");
            sessionStorage.removeItem("tkn");
            mostrarAlerta('warning', 'Advertencia', 'Esta función solo está disponible iniciando sesión con una cuenta previamente creada', rutaLogin);
        } else {
            try {
                // Intentamos decodificar el token
                const tokenParts = token.split('.');

                if (tokenParts.length !== 3) {
                    sessionStorage.removeItem("signInInfo");
                    sessionStorage.removeItem("tkn");
                    // Si el token no tiene tres partes, lo consideramos inválido
                    throw new Error('La sesión no es correcta, inicia sesión nuevamente');
                }

                // Extraemos y decodificamos el encabezado
                const header = JSON.parse(atob(tokenParts[0]));

                // Si todo está bien hasta este punto, procedemos a verificar la expiración del token
                const expirationTimestamp = header['exp'] || header['expires_at'];
                const isTokenExpired = new Date() > expirationTimestamp * 1000;

                if (isTokenExpired) {
                    // Si el token ha expirado, mostramos un mensaje y redirigimos al usuario
                    sessionStorage.removeItem("signInInfo");
                    sessionStorage.removeItem("tkn");
                    mostrarAlerta('warning', 'Advertencia', 'Tu sesión ha expirado, por favor, vuelve a iniciar sesión', rutaLogin);
                } else {
                    // Si el token está vigente, puedes realizar cualquier acción adicional aquí
                    console.log("validSession");
                }
            } catch (error) {
                sessionStorage.removeItem("signInInfo");
                sessionStorage.removeItem("tkn");
                // Si hay algún error durante el proceso, consideramos el token inválido
                mostrarAlerta('error', 'Error', 'La sesión no es correcta, inicia sesión nuevamente', rutaInicio);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}


const cerrarSesion = () => {
    sessionStorage.removeItem("signInInfo");
    sessionStorage.removeItem("tkn");
    window.location.href = '../../login.html';
}


const mostrarAlerta = (icon, title, text, redirectUrl) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        footer: '',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = redirectUrl;
        }
        else {
            window.location.href = redirectUrl;
        }
    });
}
