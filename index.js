const apiKey = '6e09b38cb67e355becb29d99d739c231';

const urls = [
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apiKey,
    'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=' + apiKey,
    'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=' + apiKey
];

window.addEventListener('DOMContentLoaded', () => {
    const peticiones = urls.map(peticion => fetch(peticion));
    
    Promise.all(peticiones)
        .then(values => Promise.all(values.map(r => r.json())))
        .then(catologos => {
            const [catalogoUno, catalogoDos, catalogoTres] = catologos;

            // Fila 1: Populares
            const populares = document.getElementById('populares');
            catalogoUno.results.forEach(pelicula => {
                const article = document.createElement('article');
                article.classList.add('pelicula');
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w500/' + pelicula.poster_path;
                img.alt = pelicula.title || 'Película';
                img.title = pelicula.title || 'Película';
                article.append(img);
                populares.append(article);
            });

            // Fila 2: Niños/Estrenos
            const estrenos = document.getElementById('estreno');
            catalogoDos.results.forEach(pelicula => {
                const article = document.createElement('article');
                article.classList.add('pelicula');
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w500/' + pelicula.poster_path;
                img.alt = pelicula.title || 'Película';
                img.title = pelicula.title || 'Película';
                article.append(img);
                estrenos.append(article);
            });

            // Fila 3: Drama 2014
            const vistas = document.getElementById('vistas');
            catalogoTres.results.forEach(pelicula => {
                const article = document.createElement('article');
                article.classList.add('pelicula');
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w500/' + pelicula.poster_path;
                img.alt = pelicula.title || 'Película';
                img.title = pelicula.title || 'Película';
                article.append(img);
                vistas.append(article);
            });
        })
        .catch(error => {
            console.error('Error al cargar películas:', error);
        });
});
