# Data Warehouse

#### *Version en español.*

### Descripcion
- Proyecto creado como herramienta para una empresa de marketing en donde puede
administrar sus contactos a traves de compañias ajenas, utilizando el sistema CRUD.
También se puede exportar un archivo con todos los **contactos en PDF o en Excel.**

## Back-End

- La base de datos utilizada es MySQL. Corre dentro del puerto 3306. 
**Utilizando un administrador como DBeaver o phpMyAdmin**, importar la base de datos que se encuentra dento de la carpeta Back-End llamada dump-warehouse.

- Por otro lado el servidor corre a traves *de NodeJS por el puerto 4500.*

>Utilizar npx nodemon o nodemon (o en su defecto node index)dentro de la carpeta Back-End para que corra el servidor.

### Dependencias

 * body-parser
 * cors
 * express
 * jsonwebtoken
 * nodemon
 * sequelize
 * bcrypt

> Las dependencias se instalan con el *comando npm* y debe correr en la terminal de la carpeta de Back-End. Se puede corroborar chequeando el archivo package.json

### Endpoints

- Los endpoints utilizados son:
  - /contactos  
  - /regiones  
  - /companias  
  - /paises  
  - /ciudades   
  - /usuarios    
  - /configuraciones

* En la carpeta routes se encuentran todas las rutas declaradas donde están todos los llamados de tipo GET, POST, PUT y DELETE de los distintos endpoints. 

* En la carpeta controllers se encuentran las funciones del Back-End que permite hacer los querys a la base de datos.

## Front-End

- Para ingresar al sitio a traves del log-in, utilizar el usuario 
manuelbelgrano@hotmail.com y la contraseña es belgrano20. Esto le permitira tener tanto los permisos de un usuario básico como el de un administrador. La diferencia es que el administrador puede crear usuarios nuevos.

### JavaScript
- Dentro de la carpeta JS se encuentran los llamados a la API en el archivo fetch.js, la colocación de los datos traidos en los archivos companias.js, contactos.js y region.js, y por último el archivo modal.js donde se encuentran todos los modales creados en este proyecto.

> Es importante mencionar el uso de la **libreria JQuery y del plug-in DataTables** para generar las tablas de Compañías y Contactos. Esta hizo mas rápido el trabajo.

### Estilos
- En la carpeta Styles estan todos los estilos creados con scss que requerian mayor código. En algunos casos, como el de index.html, el estilo se encuentra dentro del mismo archivo.



#### *English Version*

### Description
- Project created as a tool for a marketing company where you can
manage your contacts through outside companies, using the CRUD system.
You can also export a file with all **your contacts on PDF or Excel.**

## Back-End

- The database used is MySQL. It runs inside port 3306.
**Using an administrator like DBeaver or phpMyAdmin**, import the database found inside the Back-End folder called dump-warehouse.

- On the other hand, the server runs through *NodeJS on port 4500.*

> Use npx nodemon or nodemon (or failing that, node index) inside the Back-End folder to run the server.

### Dependencies

 * body-parser
 * cors
 * express
 * jsonwebtoken
 * nodemon
 * sequelize
 * bcrypt

> Dependencies are installed with the *npm command* and must run in the terminal
> from the Back-End folder. It can be corroborated by checking the package.json file

### Endpoints

- The endpoints used are:
  - /contactos  
  - /regiones  
  - /companias  
  - /paises  
  - /ciudades   
  - /usuarios    
  - /configuraciones

* Inside the routes folder are all the declared routes where the GET, POST, PUT and DELETE calls of the different endpoints are located.

* In the controllers folder you will find the Back-End functions that allow you to make queries to the database.

## Front-End

- To enter the site through the log-in, use the user
manuelbelgrano@hotmail.com and the password is belgrano20. This will allow you to have both the permissions of a basic user and that of an administrator. The difference is that the administrator can create new users.

### JavaScript
- Inside the JS folder are the API calls in the fetch.js file, the placing of the data brought in the companies.js, contacts.js and region.js files, and finally the modal.js file where all modals created in this project are found.

> It is important to mention the use of the **JQuery library and the DataTables plug-in** to generate the Companies and Contacts tables. 

### Styles
- In the Styles folder are all the styles created with scss that required more coding. In some cases, like index.html, the style is inside the same file.