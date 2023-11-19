const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;

test('GET /movies debe retornar todas las peliculas', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
  const movie = {
    name: "Spider-Man: No Way Home",
    image: "https://www.sonypictures.com.co/sites/colombia/files/2022-04/SNH_LAS_OnLine_1400x2075.jpg",
    synopsis: "En Spider-Man: No Way Home, Peter Parker busca desesperadamente ayuda de Stephen Strange para hacer que el mundo olvide su identidad como Spider-Man tras un giro inesperado que expone su secreto. Sin embargo, un hechizo mal ejecutado desencadena la llegada de villanos de realidades alternativas, llevando a Peter a enfrentarse a enemigos clásicos mientras lucha por corregir el caos desatado y salvar a sus seres queridos.",
    releaseYear: 2021
  }
  const res = await request(app).post('/movies').send(movie);

  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
  const movie = {
    releaseYear: 2022
  }
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.releaseYear).toBe(movie.releaseYear);
});

test('POST /movies/:id/actors debe insertar los actores en la pelicula', async () => {
  const actor = await Actor.create({
    firstName: "Tom",
    lastName: "Holland",
    nationality: "English",
    image: "https://es.web.img2.acsta.net/pictures/23/05/30/13/16/0004762.jpg",
    birthday: "1996-06-01"
  })

  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])

  await actor.destroy()
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar un director en la pelicula', async () => {
  const director = await Director.create({
    firstName: "Jon",
    lastName: "Watts",
    nationality: "American",
    image: "https://image.tmdb.org/t/p/w500/fkXChMX6CUXY1yOxBehAzvaTCl7.jpg",
    birthday: "1981-06-28"
  });

  const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);

  await director.destroy();

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres debe insetar un genero en una pelicula', async () => {
  const genre = await Genre.create({
    name: "Terror"
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);

  await genre.destroy();

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe borrar una pelicula', async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
})