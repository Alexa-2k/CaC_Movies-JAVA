# CaC Movies
TP integrador simulando una plataforma de películas online, utlizando HTML, CSS, Bootstrap, JS, API TMDB, JAVA

https://alexa-2k.github.io/CaC_Movies-JAVA/

## Detalles:

### Conexión API: integrada directamente en la sección "Tendencias"
* La página de inicio contiene la sección "Tendencias" que consume la API del sitio TMDB para mostrar la grilla de películas. 
* Son 500 páginas que pueden ser recorridas mediante los botones 'Anterior' y 'Siguiente'. 
* Un índice exhibe el número de página actual. 
* El recorrido es cíclico: si al llegar a la última página se presiona el botón "Siguiente", se vuelve a la primera. De modo similar, si estando en la página inicial se presiona el botón "Anterior", se pasa a la última página.
* Al presionar en la tarjeta de cada película se pasa a la sección "detalle" en la que se exhiben los datos pormenorizados (título, resumen, fecha de lanzamiento, director)  --Disclaimer: La sección "detalle" está en construcción. 

### Registro
* La sección de Registro permite a un nuevo usuario ingresar sus datos para crear una cuenta.
* Los datos deben estar completos y cumplir con algunas restricciones. 
* En caso de no cumplirse alguna de estas restricciones, aparecen alertas de tipo modal que impiden la registración

### Login (Iniciar sesión)
* El usuario ya registrado puede efectuar su login (Iniciar sesión) 
* Al igual que en la registración, los datos ingresados en el login son verificados y, en caso de ser correctos, se redirige al usuario a su página personal (la página personal de usuario está en construcción)
* En caso de no ser correctos los datos, se muestran alertas modales

