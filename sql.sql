CREATE TABLE Empresa(
    EmpresaId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Direccion VARCHAR(250) NULL,
    Nit VARCHAR(20) NULL,
    Telefono VARCHAR(20) NULL
);

CREATE TABLE Departamento(
    DepartamentoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    EmpresaId INT NOT NULL,
    FOREIGN KEY (EmpresaId) REFERENCES Empresa(EmpresaId)
);

CREATE TABLE Autenticacion(
    AutenticacionId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Usuario VARCHAR(100) NULL,
    Clave VARCHAR(100) NULL
);

CREATE TABLE Usuario(
    UsuarioId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    NombreCompleto VARCHAR(250) NULL,
    Direccion VARCHAR(250) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(200) NULL,
    Ciudad VARCHAR(100) NULL,
    Municipio VARCHAR(100) NULL,
    Pais VARCHAR(100) NULL,
    Referencia VARCHAR(250) NULL,
    Nit VARCHAR(20) NULL
);

CREATE TABLE Rol(
    RolId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Permiso INT NOT NULL
);

CREATE TABLE Pagina_Acceso(
    PaginaAcceso INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    RolIdPertenece INT NOT NULL,
    FormularioAcceso INT NULL,
    FOREIGN KEY (RolIdPertenece) REFERENCES Rol(RolId)
);

CREATE TABLE Marcas(
    MarcasId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Proveedor VARCHAR(100) NULL
);

CREATE TABLE Categorias(
    CategoriaId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Descripcion VARCHAR(100) NULL
);

CREATE TABLE Genero(
    GeneroId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Resumen VARCHAR(100) NULL
);

CREATE TABLE Metodos_Pago(
    MetodoPagoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL
);

CREATE TABLE Empleado(
    UsuarioId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    NombreCompleto VARCHAR(250) NULL,
    Direccion VARCHAR(250) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(200) NULL,
    Ciudad VARCHAR(100) NULL,
    Municipio VARCHAR(100) NULL,
    Pais VARCHAR(100) NULL,
    Sexo INT NULL,
    DPI VARCHAR(50) NULL,
    Nit VARCHAR(20) NULL,
    RolId INT NULL,
    EmpresaId INT NULL,
    FOREIGN KEY (RolId) REFERENCES Rol(RolId),
    FOREIGN KEY (EmpresaId) REFERENCES Empresa(EmpresaId)
);

CREATE TABLE Productos(
    ProductoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(250) NULL,
    Descripcion VARCHAR(250) NULL,
    Cantidad INT NULL,
    Precio NUMERIC(10,2),
    MarcaId INT NULL,
    CategoriaId INT NULL,
    GeneroId INT NULL,
    FOREIGN KEY (MarcaId) REFERENCES Marcas(MarcasId),
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(CategoriaId),
    FOREIGN KEY (GeneroId) REFERENCES Genero(GeneroId)
);

CREATE TABLE Carrito(
    CarritoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    ProductoId INT NULL,
    UsuarioId INT NULL,
    Cantidad INT NULL,
    TotalCantidad NUMERIC(10,2),
    FOREIGN KEY (ProductoId) REFERENCES Productos(ProductoId),
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
);

CREATE TABLE Ordenes(
    OrdenId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    NumeroDeOrden VARCHAR(250) NULL,
    Descripcion VARCHAR(250) NULL,
    ProductoId INT NULL,
    UsuarioId INT NULL,
    Cantidad INT NULL,
    TotalCantidad NUMERIC(10,2),
    FechaPedido DATETIME,
    FechaPago DATETIME,
    FechaRuta DATETIME,
    FechaEntrega DATETIME,
    Estado INT,
    FOREIGN KEY (ProductoId) REFERENCES Productos(ProductoId),
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
);