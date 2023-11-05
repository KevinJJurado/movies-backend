const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
  const genre = await Genre.findAll();
  return res.json(genre)
});

const create = catchError(async(req, res) => {
  const { name } = req.body;
  const genre = await Genre.create({ name });
  return res.status(201).json(genre)
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByPk(id)
  if (!genre) return res.status(404).json({message: 'Genre not Found'});
  return res.json(genre)
});
const remove = catchError(async(req, res) => {
  const { id } = req.params;
  await Genre.destroy({where: {id}});
  return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const genre = await Genre.update(
    {name},
    {where: { id }, returning: true}
  )
  if(genre[0] == 0) return res.status(404).json({message: 'Genre not Found'});
  return res.json(genre[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}