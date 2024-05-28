const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const contenedor = document.querySelector("#pelis");
const pager = document.querySelector("#paginar");


let pagina = 1;

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
      //si la pagina es mayor que 1, se pasa a la anterior
      pagina -= 1;
    }else if (pagina<=1){   
     pagina = 500;}
     pager.innerHTML = `Página: ${pagina}`;
    
     //si no, se pasa a la ultima
        cargarPeliculas();
    // llamar a la funcion que cargue las paginas de las peliculas desde la API
    
  });

 
  btnSiguiente.addEventListener("click", () => {
    if (pagina < 500) {
      //si la pagina es menor que 500, se pasa a la siguiente 
      pagina += 1; 

    }else if(pagina >=500){
      //si no, cuando se pasa de la última, se vuelve a la primera
       pagina = 1;
    } 
    pager.innerHTML = `Página: ${pagina}`;
     cargarPeliculas()
    // llamar a la funcion que cargue las paginas

  });

const cargarPeliculas = async () => {

try {
    //cargar en una variable el fetch de la API
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=615cdfacf7dd0263ec1fcea8ee4352f6&language=es-MX&page=${pagina}`)
    //verificar la respuesta en consola
    console.log(respuesta);

    if (respuesta.status === 200){
        
        //si no hay error, cargar los datos en una variable const
        const datos = await respuesta.json();
        console.log(datos);

        //y dar formato a cada tarjeta de pelicula con los datos de la API
        let peliculas = [];
        datos.results.forEach((pelicula)=>{
            peliculas += `
            <div class ="peli-link" ><a href="./detalle.html?id=${pelicula.id}" </a>
            <div class="peli-card">
                <div class="card-img">
                    <img class="peli-img" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" >
                </div>
                <div class="card-title">
                    <h3 class= "card-title">${pelicula.title}</h3>
                </div>
            </div>    
           </div>`;
        });
        contenedor.innerHTML = peliculas;
       
    } // Si  hay error 404, mensaje
    else if (respuesta.status === 404) {
        console.log("error 404 nos vemos en otro lugar");
    }
//otros errores: mensaje de error por consola
} catch(error) {
    console.log(error.message);
    }
}

//Llamar a la funcion
cargarPeliculas();

