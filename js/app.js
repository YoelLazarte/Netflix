
if( 'serviceWorker' in navigator ){
  // Registro el SW
  navigator.serviceWorker.register('/Netflix/sw.js');
  
} else {
  alert('Tu navegador no soporta esta Web APP');
}

// https://www.omdbapi.com/?s=spiderman&apikey=cc67d59f
// https://www.omdbapi.com/?i=tt3896198&apikey=cc67d59f

  const buscadorInput = document.querySelector('#buscadorId');
  const resultado = document.querySelector('.cartas');

  

  async function peliculas(buscar){
    try{
        const api = `https://www.omdbapi.com/?s=${buscar}&apikey=cc67d59f`;
        const resp = await fetch(`${api}`);
        const data = await resp.json();
        if(data.Response == "True") listaPeliculas(data.Search);
    }catch(error){
        console.error(error);
        resultado.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Ocurrio un error en el servidor
        </div>`
    }
    
    }

  
  function BuscarPeliculas(){
    let buscarTermino = (buscadorInput.value).trim();
    // console.log(buscarTermino);
    if(buscarTermino.length > 0){
        resultado.classList.remove('mostrar-lista');
        peliculas(buscarTermino);
    }else{
        resultado.classList.add('mostrar-lista');
    }   
  }

  async function listaPeliculas(peliculas){
    resultado.innerHTML="";
    for(let i = 0; i <peliculas.length; i++ ){
        let peliculasLista = document.createElement('div');
        peliculasLista.className = 'col-12 col-md-3 m-auto mt-4';
        // console.log(peliculasLista)
        peliculasLista.dataset.id = peliculas[i].imdbID;
        peliculasLista.classList.add('productos');
        if(peliculas[i].Poster !== "N/A"){
            peliculaPoster = peliculas[i].Poster;
        }
        else{
            peliculaPoster = "img/imagen.jpg";
        }

        peliculasLista.innerHTML = `
            <figure class="card">
                <div class="corner left-top"></div>
                <div class="corner left-bottom"></div>
                <div class="corner right-top"></div>
                <div class="corner right-bottom"></div>
                <img src="${peliculaPoster}" alt="${peliculas[i].Title}">
                
                <figcaption>
                <div class="">
                <div class="col-12 ">
                    <h3>${peliculas[i].Title}</h3>
                    <p class="card-text mt-2 mb-0 text-warning">${peliculas[i].imdbRating} <i class="fa-regular fa-star"></i></p>
                </div>
                
                <div class="contenido-card w-100 mt-5">
                   <button class="btn" onClick=addTofavorites('${peliculasLista.dataset.id}')>
                         <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icono">
                           <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                         </svg>
                    </button>
                    <button class="btn2 btn btn-dark btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detalles</button>
                </div>
                <div class="col-6">
                </div>
                
                </div>
                </figcaption>
            </figure>
        
        `;
            
        
    
        resultado.appendChild(peliculasLista)
    }
    cargarDetalles();

  }
  
  
  // 

  
  function cargarDetalles(){
    const buscarListaPelicula = resultado.querySelectorAll('.productos');
    buscarListaPelicula.forEach(pelicula =>{  
        pelicula.addEventListener('click', async() =>{
            try{
              const resultado = await fetch(`https://www.omdbapi.com/?i=${pelicula.dataset.id}&apikey=cc67d59f`);
              const detallePelis = await resultado.json();
              console.log(detallePelis);
              modalDetalles(detallePelis);
            }catch(error){
              console.error(error)
              resultado.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ocurrio un error en el servidor
            </div>`
            }
        })
    })
  }

  function modalDetalles(detalles){
    const modal = document.querySelector('.modal-contenedor');
    
    modal.innerHTML=`
    <div class=" mb-3 m-auto" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-12 col-md-4 ">
          <img src="${(detalles.Poster)}" class="card-img-top" alt="${detalles.Title}">
          <p class="card-text mt-2 mb-0 text-warning">${detalles.imdbRating} <i class="fa-regular fa-star"></i></p>
        </div>
        <div class="col-12 col-md-8 ps-md-5">
          <div class="card-body">
            <h5 class="card-title text-danger mb-3 fs-3">${detalles.Title}</h5>
            <p class="card-text mb-1"><strong>Director: </strong>${detalles.Director}</p>
            <p class="card-text mb-1"><strong>Categoria: </strong> ${detalles.Rated}</p>

            <p class="card-text mb-1">Year: ${detalles.Year} <span class="badge text-bg-light">Fecha: ${detalles.Released} </span> Runtime: ${detalles.Runtime}</p>

            <p class="card-text mb-1"><span class="badge text-bg-secondary">Genero: ${detalles.Genre}</span></p>

            <p class="card-text"><small><strong>Actores: </strong>${detalles.Actors}</small></p>

            <p class="card-text mb-1 text-warning"><i class="fa-solid fa-award"></i> ${detalles.Awards}</p>

            </div>
            </div>
            <p class="card-text mt-3"><strong>Sinapsis: </strong>${detalles.Plot}</p>
      </div>
  </div>

    `; 

  }



  
const alerta = document.querySelector(".alerta");

async function addTofavorites(id) {

  const api = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=cc67d59f`
  const resp = await fetch(api);
  const data = await resp.json();
  console.log(data);

  let favoritos = localStorage.getItem('favoritos');
  favoritos = favoritos ? JSON.parse(favoritos) : [];

  favoritos.push(data);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  alerta.innerHTML=`
  <div class="container alert alert-success" role="alert">
    ¡La película ha sido agregada a tus favoritos <a href="#" class="alert-link">Con Exito!</a>.
  </div>
`

setTimeout(() => {
  alerta.innerHTML = '';
}, 2000);
}




async function removeFromfavorites(id) {
  let favoritos = localStorage.getItem('favoritos');
  favoritos = favoritos ? JSON.parse(favoritos) : [];

  favoritos = favoritos.filter(movie => movie.imdbID !== id);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  window.location.replace('favoritos.html');
}



async function favoritesMovieLoader() {

    var output = '';

    let favoritos = localStorage.getItem('favoritos');
    favoritos = favoritos ? JSON.parse(favoritos) : [];


    favoritos.forEach(data =>{      

            var img = ''
            if (data.Poster) {
                img = data.Poster
            }
            else { img = data.Title }
            var Id = data.imdbID;

            output += `
              <figure class="card">
                <div class="corner left-top"></div>
                <div class="corner left-bottom"></div>
                <div class="corner right-top"></div>
                <div class="corner right-bottom"></div>
                <img src="${img} " alt="${data.Title}">
                <figcaption>
                    <h3>$${data.Title}</h3>
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-rating">${data.Year} &middot; <span style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span>/10</p>
                    </div>
                      <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removeFromfavorites('${Id}')></i>
                </figcaption>
            </figure>
       `;

      });
      

    document.querySelector('.fav-container').innerHTML = output;
}