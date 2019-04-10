const shortid = require('shortid')
const { sync } = require('./sync')
const { read, write } = sync('./data/data.json')

const get = (id) => {
  const errors = []
  const data = read()
  const entry = data.find(e => e.id === id)

  if (!entry) {
    errors.push(`${id} doesn't exist`)
    return { errors }
  }
  return entry
}

const getAll = (limit) => {
  const errors = []
  const data = read()

  if (!data.length) {
    errors.push(`there are no entries :(`)
    return { errors }
  }
  return limit ? data.slice(0, limit) : data
}

const create = (body) => {
  const errors = []
  const { name, content } = body
  const data = read()

  if (!name || !content) {
    errors.push(`new entry must have a name and a content`)
    return { errors }
  }

  let entry = { id: `${ shortid.generate() }`, name, content }

  data.push(entry)
  write(data)
  return entry
}

const edit = (id, body) => {
  const errors = []
  const { name, content } = body
  const data = read()
  const entry = data.find(e => e.id === id)

  if (!name && !content) {
    errors.push(`must use name or content for editing`)
    return { errors }
  }

  if (content && !name) {
    entry.content = content
    write(data)
    return entry
  }

  if (name && !content) {
    entry.name = name
    write(data)
    return entry
  }

  entry.name = name
  entry.content = content
  write(data)
  return entry
}

const remove = (id) => {
  const errors = []
  const data = read()
  const entry = data.find(e => e.id === id)
  const index = data.findIndex(i => i.id === id)

  if (!entry) {
    errors.push(`${id} doesn't exist`)
    return { errors }
  }

  data.splice(index, 1)
  write(data)
  return data
}

module.exports = { get, getAll, create, edit, remove }
