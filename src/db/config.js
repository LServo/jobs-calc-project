const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // traz o método open do sqlite3

module.exports = () =>
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
