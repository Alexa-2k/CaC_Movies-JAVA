const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const contenedor = document.querySelector("#pelis");
const pager = document.querySelector("#paginar");
const apiKey = '615cdfacf7dd0263ec1fcea8ee4352f6'; 
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
const web = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX&page=${pagina}`;


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
         window.location.href = "#tendencias";
    // llamar a la funcion que cargue las paginas de las peliculas desde la API e ir al inicio de la sección de Tendencias
    
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
  window.location.href = "#tendencias";
      // llamar a la funcion que cargue las paginas de las peliculas desde la API e ir al inicio de la sección de Tendencias

  });

/*----------------------------------------------------------------
 Funcion que carga las peliculas: */

const cargarPeliculas = async () => {

try {
    //cargar en una variable el fetch de la API
    const respuesta = await fetch(web)
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
              <div class="peli-card animate__animated animate__zoomIn">
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
        
       
    } else if (respuesta.status === 404) {console.log("error 404 nos vemos en otro lugar");
    } else if(respuesta.status === 401) {console.log("No tiene la api_key correcta");}

//otros errores: mensaje de error por consola
  } catch(error) {console.log("BOOM! Something exploded"); }
}

//Llamar a la funcion
cargarPeliculas();

/*==================================================================*/
/* DETALLE PELICULA */
function fetchMovieDetails(movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=615cdfacf7dd0263ec1fcea8ee4352f6&language=es-MX`)
           .then(response => response.json())
           .then(data => {
                document.querySelector('#peli-detalle img.peli-img').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                document.querySelector('.peli-title').textContent = data.title;
                document.querySelector('.peli-descripcion').textContent = data.overview;
                document.querySelector('.peli-estreno').textContent = `Estreno: ${new Date(data.release_date).getFullYear()}`;
                document.querySelector('.peli-clasificacion').textContent = `Clasificación: ${data.vote_average}`;
                document.querySelector('.peli-duracion').textContent = `Duración: ${data.runtime} minutos`;
                document.querySelector('.peli-trailer').href = `https://www.youtube.com/watch?v=${data.videos.results[0].key}`;
                document.querySelector('.peli-reparto').textContent = `Reparto: ${data.credits.cast[0].name}`;
                document.querySelector('.peli-director').textContent = `Director: ${data.credits.crew[0].name}`;
                document.querySelector('.peli-genero').textContent = `Género: ${data.genres[0].name}`;
                document.querySelector('.peli-idioma').textContent = `Idioma: ${data.spoken_languages[0].name}`;
                document.querySelector('.peli-pais').textContent = `País: ${data.production_countries[0].name}`;
                
            })
           .catch(error => console.error('Error:', error));
    }


 /* ========= PRUEBA ACLAMADAS =============*/ 
const cargarAclamadas = async (ids) => {
  const contAclamadas = document.querySelector('#aclamadas-main'); 

  try {
    for (let id of ids) {
      
      const resp = await fetch(url);

      if (resp.status === 200) {
        const datos = await resp.json();

        // Formatear los datos de la película como HTML
        const html = `
          <div class="peli-card aclamada">
            <a href="./detalle.html?id=${datos.id}">
              <div class="card-img">
                <img class="peli-img" src="https://image.tmdb.org/t/p/w500${datos.poster_path}" alt="${datos.title}">
              </div>
              <div class="card-title">
                <h3 class= "card-title">${datos.title}</h3>
              </div>
            </a>
          </div>
        `;

        // Agregar el HTML al contenedor
        contAclamadas.innerHTML += html;
      } else if (resp.status === 404) {
        console.log(`Error 404 para la película con ID ${id}`);
      } else {
        console.error(`Error desconocido para la película con ID ${id}`);
      }
    }
  } catch (error) {
    console.error('Error al cargar películas:', error.message);
  }
};

// Llamar a la función con  IDs específicos
const ids = [497, 155, 49026, 218, 105, 165, 196, 27205, 2277, 603, 16869, 36657, 1726, 157336, 238, 240, 242];
cargarAclamadas(ids);
