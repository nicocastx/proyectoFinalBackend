### Descripcion
Bienvenido a mi proyecto final del Curso de coderhouse sobre Backend, en donde desarrollo la parte del backend para un Ecommerce, en este caso, mi inspiracion para ello fue construirlo sobre una pagina de instrumentos, donde utilizo distintas herramientas para llevar a cabo su construccion
El proyecto esta basado en Node.JS, utilizando distintas metodologias aprendidas dentro del cursado de Backend en Coderhouse

### Sobre mi
Yo soy Kevin Castillo, soy estudiante de ingenieria en sistemas y decidi dedicarme en mis tiempos libres a aprender un poco de programacion por mi cuenta, esta seria mi culminacion de la carrera que vengo llevando a cabo en CoderHouse sobre desarrollo en Backend

### Dependencias utilizadas
- [winston](https://github.com/winstonjs/winston)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [socket.io](https://www.npmjs.com/package/socket.io)

## Instalación

Para instalar este proyecto, sigue estos pasos:

1. Clona el repositorio desde GitHub.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en un archivo `.env`.
4. Inicia la aplicación con `npm start`.

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
### Usuarios

------------


#### Ruta /
Es el landing de la pagina, en donde podemos hacer 2 tipos de peticiones:
get: en donde se renderiza la pagina principal y se guardan los datos de los clientes
post: se hace el logeo del usuario en la pagina, se levanta una session, y con la estrategia local de passport se levanta esa sesion
#### Ruta /register
Pagina en donde se puede registrar a un nuevo usuario, y con estrategia de passport local se levanta su sesion, y se guardan los datos del usuario en mongoDB, usando Bcrypt para encriptar la contraseña antes de guardarla en la BD
- Pasos para un post:
Para hacer un post hacia la base de datos, y registrar un usuario, debemos pasar los siguientes datos
JSON de ejemplo:
```javascript
   {
    "username": "nicotest2@gmail.com",
    "password":"123",
    "nombre":"kvinasd",
    "apellido":"castasd",
    "nroTelefono":"123123asd"
    }
```
#### Ruta logout
Desloguea la sesion actual de algun usuario

### Productos - /productos

------------


#### get /
Devuelve una lista con todos los productos, es la ruta destino despus de haber completado satisfactoriamente el inicio de sesion
#### get /:id
Devuelve los datos de un producto especifico
#### post /
Agarra el json que se pase como parametro en el req.body y se guarda la informacion en la base de datos en productos
Ejemplo de un ingreso de datos:

```javascript
    {
    "nombre": "Guitarra Yamaha MK89",
    "img": "https://media.tenor.com/KuxgIrYVdDcAAAAC/gandalf-laughing.gif",
    "precio": 124.5,
    "categoria": "Guitarras"
    }
```

#### put /:id
Modifica los datos de un producto y guarda los cambios realizados en la base de datos
#### delete /:id
Elimina un producto ingresado de la base de datos a traves de una busqueda realizada por ID
#### get /buscar/:categoria
Realiza una busqueda en los productos de aquellos productos que posean la misma categoria que se ingrese

### Carrito - /carrito

------------


#### get /
Obtiene el carrito del usuario conectado, el cual si es que el usuario no posee ningun carrito creado, devuelve un nuevo carrito desde 0
#### delete /
Elimina un carrito creado con anterioridad por completo, para asi volver a crearlo desde 0
#### put /
Modifica la direccion del carrito ingresado solamente
#### post /:idProducto
A partir de una id ingresada, se busca esa id dentro de la lista de productos, y se hacen las validaciones necesarias, en caso de ya existir el producto en el carrito, aumenta en 1 un contador
#### delete /:idProducto
Elimina todo un objeto de los items del carrito, incluyendo todo el contador creado

### Ordenes - /ordenes

------------


#### get /
Permite mostrar todas las ordenes asociadas a ese mail, las cuales presentaran todos los datos ingresados al momento de su creacion en un determinado formato
#### post /
Permite guardar una orden en la BD, la cual se genera con un estado por defecto de generada, y toma todos los datos del carrito para crearse
Por si solo no recibe ningun parametro, pero requiere de que el carrito de un usuario posea al menos 1 producto, y que se haya especificado alguna direccion para hacer la entrega

### Chat

------------


#### get /
Renderiza una pagina basica la cual muestra un chat desde el que se envia un mensaje por el chat, luego ese mensaje se guarda en la base de datos correspondiente con la informacion del usuario, la fecha de creacion, el tipo de usuario, si es un usuario o es un usuario correspondiente al sistema, todo esto manejado a traves de los sockets


