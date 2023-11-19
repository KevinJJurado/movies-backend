const request = require('supertest');
const app = require('../app');

test('GET /directors debe retoranr todos los directores', async () => {
  const res = await request(app).get('/directors')

  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un nuevo director', async () => {
  const director = {
    firstName: "Jon",
    lastName: "Watts",
    nationality: "American",
    image: "https://image.tmdb.org/t/p/w500/fkXChMX6CUXY1yOxBehAzvaTCl7.jpg",
    birthday: "1981-06-28"
  }
  const res = await request(app).post('/directors').send(director);

  id = res.body.id;

  expect(res.status).toBe(201)
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /directors debe actualizar un director', async () => {
  const director = {
    firstName: "John"
  }
  const res = await request(app).put(`/directors/${id}`).send(director)

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors debe borrar un director', async () => {
  const res = await request(app).delete(`/directors/${id}`)

  expect(res.status).toBe(204)
});