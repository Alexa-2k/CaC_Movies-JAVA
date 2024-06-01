document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=615cdfacf7dd0263ec1fcea8ee4352f6&language=es-MX/id={pelicula.id}";
    const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const movieId = Number(getMovieIdFromUrl());
  console.log(movieId);

  const fetchItem = async () => {
    try {
      console.log(`${apiUrl}/${movieId}`);
      const response = await fetch(`${apiUrl}/${movieId}`);

      if (!response.ok) {
        window.location.href = "./notfound.html";
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const movie = await response.json();

      return movie;
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      return [];
    }
  };

  const btnMenu = document.querySelector(".btn-menu");
  const menuItems = document.querySelector(".menu-items");
  const btnBrand = document.querySelector(".brand");

  // captura datos para ver si ya inicio session o no
  const logOutButton = document.querySelector("#log-out");
  const logInButton = document.querySelector("#log-in");
  const adminButton = document.querySelector("#admin");
  const registraseButton = document.querySelector("#registrarse");
  var isLogged = localStorage.getItem("user");

  console.log(isLogged);

  // para mostrar o iniciar Session o el Logout
  if (!isLogged) {
    logOutButton.style.display = "none";
    logInButton.style.display = "block";
    registraseButton.style.display = "block";
    adminButton.style.display = "none";
  } else {
    logOutButton.style.display = "block";
    logInButton.style.display = "none";
    registraseButton.style.display = "none";
    adminButton.style.display = "block";
  }

  // para el menu hamburgesa
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    menuItems.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
    btnBrand.addEventListener("click", () => {
      menuItems.classList.toggle("show");
    });
  }

  if (logOutButton) {
    logOutButton.addEventListener("click", logout);
  }

  function logout() {
    localStorage.removeItem("user");
  }

  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  const titulo = document.querySelector("#titulo");
  const overview = document.querySelector("#overview");
  const realease = document.querySelector("#realease");
  const runtime = document.querySelector("#runtime");
  const genres = document.querySelector("#genres");
  const crew = document.querySelector("#crew");
  const poster = document.querySelector("#poster");
  const statusData = document.querySelector(".status-data");
  const languageData = document.querySelector(".language-data");
  const budgetData = document.querySelector(".budget-data");
  const revenueData = document.querySelector(".revenue-data");
  const video = document.querySelector("#video");
  const detailsHeader = document.querySelector(".details-header");

  function formatNumber(number) {
    // Utiliza el método toLocaleString con las opciones adecuadas para el formato deseado
    return number.toLocaleString("es-ES", {
      minimumFractionDigits: 2, // Asegura que siempre haya al menos 2 decimales
      maximumFractionDigits: 2, // Limita a 2 decimales
    });
  }

  // Función para obtener datos de la API

  const renderItem = (movie) => {
    const newImageUrl = movie.backdrop_path; // Reemplaza esto con la URL de la nueva imagen
    detailsHeader.style.backgroundImage = `url('${newImageUrl}')`;
    titulo.innerHTML = movie.title;
    overview.innerHTML = movie.overview;
    runtime.innerHTML = `${movie.runtime} min`;
    realease.innerHTML = convertDateFormat(movie.release_date);
    genres.innerHTML = movie.genres.map((genre) => genre.name).join(", ");

    crew.innerHTML = "";
    movie.crew.forEach((person) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
           <h3>${person.name}</h3>
           <p>${person.job}</p>
        `;
      crew.appendChild(movieElement);
    });

    poster.innerHTML = `<img src="${movie.poster_path}" alt="${movie.title}"/>`;
    statusData.innerHTML = movie.status;
    languageData.innerHTML = movie.original_language;
    budgetData.innerHTML = `$  ${formatNumber(movie.budget)}`;
    revenueData.innerHTML = `$  ${formatNumber(movie.revenue)}`;

    video.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${movie.video}" title="${movie.title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
  };

  const loadPage = async () => {
    const movie = await fetchItem();

    renderItem(movie);
  };

  loadPage();
});
