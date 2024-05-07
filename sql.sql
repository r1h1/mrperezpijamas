CREATE TABLE Empresa(
    EmpresaId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Direccion VARCHAR(250) NULL,
    Nit VARCHAR(20) NULL,
    Telefono VARCHAR(20) NULL,
    Estado INT
);

INSERT INTO Empresa (Direccion, Nit, Telefono, Estado)
VALUES ('Mr Perez Pijamas', '123456789', '123456789', 1);

CREATE TABLE Departamento(
    DepartamentoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    EmpresaId INT NOT NULL,
    Estado INT,
    FOREIGN KEY (EmpresaId) REFERENCES Empresa(EmpresaId)
);

CREATE TABLE Rol(
    RolId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Permiso INT NOT NULL,
    Estado INT
);

INSERT INTO Rol (Nombre, Permiso, Estado) VALUES ('Super Administrador', 1, 1);
INSERT INTO Rol (Nombre, Permiso, Estado) VALUES ('Administrador', 2, 1);
INSERT INTO Rol (Nombre, Permiso, Estado) VALUES ('Usuario', 3, 1);

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
    Nit VARCHAR(20) NULL,
    RolId INT,
    Estado INT,
    FOREIGN KEY (RolId) REFERENCES Rol(RolId)
);

-- USUARIO DE CONEJILLO DE INDIAS
INSERT INTO Usuario (NombreCompleto, Direccion, Telefono, Email, Ciudad, Municipio, Pais, Referencia, Nit, RolId, Estado)
VALUES ('NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 3, 1);

CREATE TABLE Pagina_Acceso(
    PaginaAccesoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    RolIdPertenece INT NOT NULL,
    FormularioAcceso VARCHAR(250) NULL,
    Estado INT,
    FOREIGN KEY (RolIdPertenece) REFERENCES Rol(RolId)
);

CREATE TABLE Marcas(
    MarcasId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Proveedor VARCHAR(100) NULL,
    Estado INT
);

CREATE TABLE Categorias(
    CategoriaId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Descripcion VARCHAR(100) NULL,
    Estado INT
);

CREATE TABLE Genero(
    GeneroId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Resumen VARCHAR(100) NULL,
    Estado INT
);

CREATE TABLE Metodos_Pago(
    MetodoPagoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NULL,
    Estado INT
);

CREATE TABLE Empleado(
    EmpleadoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
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
    Estado INT,
    FOREIGN KEY (RolId) REFERENCES Rol(RolId),
    FOREIGN KEY (EmpresaId) REFERENCES Empresa(EmpresaId)
);

INSERT INTO Empleado (NombreCompleto, Direccion, Telefono, Email, Ciudad, Municipio, Pais, Sexo, DPI, Nit, RolId, EmpresaId, Estado)
VALUES ('NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 1, 'NA', 'NA', 1, 1, 1);

CREATE TABLE Productos(
    ProductoId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(250) NULL,
    Descripcion VARCHAR(250) NULL,
    Cantidad INT NULL,
    Precio NUMERIC(10,2) NULL,
    Imagen VARCHAR(MAX) NULL,
    MarcaId INT NULL,
    CategoriaId INT NULL,
    GeneroId INT NULL,
    Estado INT,
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
    Estado INT,
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
    Activo INT,
    FOREIGN KEY (ProductoId) REFERENCES Productos(ProductoId),
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
);

CREATE TABLE Autenticacion(
    AutenticacionId INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    UsuarioId INT NULL,
    EmpleadoId INT NULL,
    Usuario VARCHAR(100) NULL,
    Clave VARCHAR(100) NULL,
    Token VARCHAR(250) NULL,
    Estado INT,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (EmpleadoId) REFERENCES Empleado(EmpleadoId),
);