const fs = require('fs')
const path = require('path')

const sync = (source) => {
  return {
    read: () => JSON.parse(fs.readFileSync(path.join(__dirname, source), 'utf-8')),
    write: (val) => fs.writeFileSync(path.join(__dirname, source), JSON.stringify(val, null, 2), 'utf-8')
  }
}

module.exports = { sync }
