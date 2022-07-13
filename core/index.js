const { loadHtmlTemplate } = require('../utils/file')

class App {
  /**
   * 
   * @param {string} name the name of class 
   * @param {object} options the options of class
   */
  constructor(name, options) {
    this.name = name
    this.options = options
  }

  /**
   * Get prefox of key
   * @param {string} key 
   * @returns prefix of key
   */
  getKeyPrefix(key) {
    return `{{${this.name}.${key}}}`
  }


  render() {
    let tmp = loadHtmlTemplate(this.name.toLowerCase())
    for(const key in this.options) {
      tmp = tmp.replaceAll(this.getKeyPrefix(key), this.options[key])
    }
    return tmp
  }
}

module.exports = App