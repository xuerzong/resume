const path = require('path')

const ROOT_DIR = process.cwd()
const TEMPLATE_DIR = path.resolve(ROOT_DIR, 'templates')
const CORE_DIR = path.resolve(ROOT_DIR, 'core')

module.exports = {
  ROOT_DIR,
  TEMPLATE_DIR,
  CORE_DIR
}