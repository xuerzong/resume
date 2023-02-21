const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const Handlebars = require('handlebars')
const { ROOT_DIR, OUTPUT_PATH } = require('../constants/path')
const moment = require('moment')
const registerIcons = require('../components/icons')

const loadFile = (path) => {
  if(!fs.existsSync(path)) {
    throw new Error(`There is not a file be called path:${path}`)
  }
  return fs.readFileSync(path, 'utf-8')
}

const loadHBSTemplate = () => loadFile(path.resolve(ROOT_DIR, 'index.hbs'))
const loadConfigYaml = () => {
  const config = loadFile(path.resolve(ROOT_DIR, 'config.yaml'))
  return yaml.load(config)
}
const loadCss = () => loadFile(path.resolve(OUTPUT_PATH, 'styles/index.css'))

const buildHtml = () => {
  const outputDir = path.resolve(ROOT_DIR, OUTPUT_PATH)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const resumeConfig = loadConfigYaml()
  const template = loadHBSTemplate()
  const css = loadCss()

  // config handlebars
  Handlebars.registerHelper('formatTime',  function(time) {
    return time ? moment(time).format('YYYY.MM') : '至今'
  })
  Handlebars.registerHelper('formatDate',  function(time) {
    return moment(time).format('YYYY.MM.DD')
  })
  registerIcons(Handlebars)

  const now = new Date()

  const html = Handlebars.compile(template, { noEscape: true })({
    ...resumeConfig,
    'updated-at': now,
    css
  })

  fs.writeFileSync(path.resolve(outputDir, 'index.html'), html, 'utf-8')

  return html
}

module.exports = buildHtml
