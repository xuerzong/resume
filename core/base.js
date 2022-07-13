const App = require('.')

const defaultOptions = {
  name: 'name',
  age: 'age',
  email: 'email',
  phone: 'phone'
}


class Base extends App {
  constructor(options) {
    super('Base', {...defaultOptions, ...options})
  }
}

module.exports = Base