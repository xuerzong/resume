const path = require('path')

const OUTPUT_PATH = process.env.OUTPUT_PATH || './dist'

const ROOT_DIR = process.cwd()
const TEMPLATE_DIR = path.resolve(ROOT_DIR, 'templates')
const CORE_DIR = path.resolve(ROOT_DIR, 'core')
const DIST_DIR = path.resolve(ROOT_DIR, OUTPUT_PATH)

module.exports = {
  OUTPUT_PATH,
  ROOT_DIR,
  TEMPLATE_DIR,
  CORE_DIR,
  DIST_DIR
}