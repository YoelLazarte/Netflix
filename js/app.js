
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

//   peliculas('avengers')  
  
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
            <article class="card" >
                <div class='card-background'>
                    <img src="${peliculaPoster}" alt="${peliculas[i].Title}" />
                </div>
                <div class='content'>
                    <h1 class="fs-5">${peliculas[i].Title}</h1>
                </div>
                <div class="action-bottom-bar">
                    <a href="#" class="boton" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Ver Mas
                        <svg xmlns="http://www.w3.org/2000/svg" class="chevron" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l14 0"></path>
                            <path d="M15 16l4 -4"></path>
                            <path d="M15 8l4 4"></path>
                        </svg>
                    </a>
                </div>
            </article>
        
        `;
    
        resultado.appendChild(peliculasLista)
    }
    cargarDetalles();

  }

  

  
  function cargarDetalles(){
    const buscarListaPelicula = resultado.querySelectorAll('.productos');
    buscarListaPelicula.forEach(pelicula =>{
        // console.log(pelicula)    
        pelicula.addEventListener('click', async() =>{
            // console.log(pelicula.dataset.id);
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



