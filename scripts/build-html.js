const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const Handlebars = require('handlebars')
const { ROOT_DIR, OUTPUT_PATH } = require('../constants/path')
const moment = require('moment')
const registerIcons = require('../components/icons')

const loadConfigYaml = () => {
  const yamlStr = fs.readFileSync(path.resolve(ROOT_DIR, 'config.yaml'), 'utf-8')
  return yaml.load(yamlStr)
}

const loadHBSTemplate = () => {
  const hbs = fs.readFileSync(path.resolve(ROOT_DIR, 'index.hbs'), 'utf-8')
  return hbs
}

const buildHtml = () => {
  const resumeConfig = loadConfigYaml()

  const outputDir = path.resolve(ROOT_DIR, OUTPUT_PATH)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const template = loadHBSTemplate()

  // config handlebars
  Handlebars.registerHelper('formatTime',  function(time) {
    return time ? moment(time).format('YYYY.MM') : '至今'
  })
  Handlebars.registerHelper('formatDate',  function(time) {
    return moment(time).format('YYYY.MM.DD')
  })
  registerIcons(Handlebars)
  
  const html = Handlebars.compile(template)(resumeConfig)

  fs.writeFileSync(path.resolve(outputDir, 'index.html'), html, 'utf-8')

  return html
}

module.exports = buildHtml