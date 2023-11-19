const request = require('supertest');
const app = require('../app');

let id;
test('GET /actors debe retornar todos los actores', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
  const actor = {
    firstName: "Tom",
    lastName: "Holland",
    nationality: "English",
    image: "https://es.web.img2.acsta.net/pictures/23/05/30/13/16/0004762.jpg",
    birthday: "1996-06-01"
  }
  const res = await request(app).post('/actors').send(actor);

  id = res.body.id

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
  const actor = {firstName: "Stanley"}
  const res = await request(app).put(`/actors/${id}`).send(actor);

  expect(res.status).toBe(200)
  expect(res.body.firstName).toBe(actor.firstName)
});

test('DELETE /actors/:id debe borrar ', async () => {
  const res  = await request(app).delete(`/actors/${id}`)
  expect(res.status).toBe(204);
})