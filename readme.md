[TOC]

#### Descripcion
Bienvenido a mi proyecto final del Curso de coderhouse sobre Backend, en donde desarrollo la parte del backend para un Ecommerce, en este caso, mi inspiracion para ello fue construirlo sobre una pagina de instrumentos, donde utilizo distintas herramientas para llevar a cabo su construccion

#### Sobre mi
Yo soy Kevin Castillo, soy estudiante de ingenieria en sistemas y decidi dedicarme en mis tiempos libres a aprender un poco de programacion por mi cuenta, esta seria mi culminacion de la carrera que vengo llevando a cabo en CoderHouse sobre desarrollo en Backend

#### Dependencias utilizadas

- Bcrypt
- Connect-mongo
- dotenv
- express
- express-handlebars
- express-session
- mongoose
- nodemailer
- passport
- passport-local

# El proyecto en profundidad
## Descripcion detallada
En el proyecto se utilizo una estructura basada en el patron MVC, en donde separamos los elementos del proyecto en distintas carpetas, en el caso de este proyecto, se utlizaron carpetas como:
- Routes
En donde se encuentra toda la capa de ruteo, y las posibles rutas a las que se puede navegar por el proyecto
- Services
En donde se consumen las operaciones traidas por la DB, y tambien se ocupa de manejar algunas funciones auxiliares para la logica de negocio
- Controllers
Manejo de todas las peticiones que se realizan a las distintas rutas, donde se consumen los servicios y se devuelve informacion al cliente
- Model
Manejo de toda la persistencia, operaciones y consultas a las bases de datos, y el manejo de las colecciones que se guardan en mongoDB Atlas

## Flujo de navegacion
### Ruta /
Es el landing de la pagina, en donde podemos hacer 2 tipos de peticiones:
get: en donde se renderiza la pagina principal y se guardan los datos de los clientes
post: se hace el logeo del usuario en la pagina, se levanta una session, y con la estrategia local de passport se levanta esa sesion
### Ruta /register
Pagina en donde se puede registrar a un nuevo usuario, y con estrategia de passport local se levanta su sesion, y se guardan los datos del usuario en mongoDB, usando Bcrypt para encriptar la contraseña antes de guardarla en la BD
- Pasos para un post:
Para hacerun post hacia la base de datos, y registrar un usuario, debemos pasar los siguientes datos
JSON de ejemplo:
`{
  "username": "nicolas@gmail.com",
	"password":"123",
	"nombre":"Kevin",
	"apellido":"Castillo",
	"nroTelefono":"+w5493513448694"
}`
