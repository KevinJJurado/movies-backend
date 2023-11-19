const request = require('supertest');
const app = require('../app');

let id;

test('GET debe retornar todos lo generos', async () => {
  const res = await request(app).get('/genres')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un genero', async () => {
  const genre = {
    name: "Terror"
  }
  const res = await request(app).post('/genres').send(genre)

  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id debe actualizar un genero', async () => {
  const genre = {
    name: "Science fiction"
  }
  const res = await request(app).put(`/genres/${id}`).send(genre)
  
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id debe borrar un genero', async () => {
  const res = await request(app).delete(`/genres/${id}`)
  expect(res.status).toBe(204)
});