const { loadHtmlTemplate } = require('../utils/file')
const { TEMPLATE_DIR } = require('../constants/path')

const defaultOptions = {
  name: 'name',
  age: 'age',
  email: 'email',
  phone: 'phone'
}


class Base {
  prefix = 'BASE.OPTIONS'

  constructor(options) {
    this.options = {  ...defaultOptions, ...options }
  }

  /**
   * 
   * @param {string} key 
   * @returns base's prefix of key
   */
  _getPrefix(key) {
    return `${this.prefix}.${key}`
  }

  render() {
    let template = loadHtmlTemplate('base')
    template = template.replace(this._getPrefix('name'), this.options.name)
    return template
  }
}

module.exports = Base