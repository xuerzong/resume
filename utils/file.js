const fs  = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { TEMPLATE_DIR, ROOT_DIR } = require('../constants/path')

const loadConfigYaml = () => {
  const yamlStr = fs.readFileSync(path.resolve(ROOT_DIR, 'config.yaml'), 'utf-8')
  return yaml.load(yamlStr)
}

/**
 * Get index html template
 * @returns 
 */
const loadIndexTemplate = () => {
  return loadHtmlTemplate('index')
}

/**
 * Get html template of type
 * @param {'index' | 'base'} type 
 * @returns html template content
 */
const loadHtmlTemplate = (type) => {
  return fs.readFileSync(path.resolve(TEMPLATE_DIR, `${type}.html`), 'utf-8')
}

module.exports = {
  loadConfigYaml,
  loadIndexTemplate,
  loadHtmlTemplate
}