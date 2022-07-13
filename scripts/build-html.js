const fs  = require('fs')
const path = require('path')
const { ROOT_DIR, OUTPUT_PATH } = require('../constants/path')
const Base = require('../core/base')
const { loadConfigYaml, loadIndexTemplate } = require('../utils/file')

const buildHtml = () => {
  let indexHtml = loadIndexTemplate()
  const { base: _base } = loadConfigYaml();
  
  const base = new Base(_base)
  
  const baseRender = base.render()
  
  indexHtml = indexHtml.replace('<main id="resume">', `<main id="resume">${baseRender}`)
  
  const outputDir = path.resolve(ROOT_DIR, OUTPUT_PATH)
  
  if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  
  const indexHtmlPath = path.resolve(outputDir, 'index.html')
  if(fs.existsSync(indexHtmlPath)) {
    fs.unlinkSync(indexHtmlPath)
  }

  fs.writeFileSync(path.resolve(outputDir, 'index.html'), indexHtml, 'utf-8')
}

module.exports = buildHtml