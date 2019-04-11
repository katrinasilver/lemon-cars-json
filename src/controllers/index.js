const model = require('../models')

const read = (req, res, next) => {
  const data = model.get(req.params.id)
  if (data.errors) return next({ status: 400, type: `bad request`, errors: data.errors })
  res.status(200).json(data)
}

const readAll = (req, res, next) => {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json(data)
}

const create = (req, res, next) => {
  const data = model.create(req.body)
  if (data.errors) return next({ status: 400, type: `add failed`, errors: data.errors })
  res.status(201).json(data)
}

const edit = (req, res, next) => {
  const data = model.edit(req.params.id, req.body)
  if (data.errors) return next({ status: 400, type: `edit failed`, errors: data.errors })
  res.status(201).json(data)
}

const remove = (req, res, next) => {
  const data = model.remove(req.params.id)
  if (data.errors) return next({ status: 400, type: `delete failed`, errors: data.errors })
  res.status(200).json(data)
}

module.exports = { read, readAll, create, edit, remove }
