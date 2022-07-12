const fs  = require('fs')
const path = require('path')
const { ROOT_DIR } = require('../constants/path')
const Base = require('../core/base')
const { loadConfigYaml, loadIndexTemplate } = require('../utils/file')

let indexHtml = loadIndexTemplate()
const { base: _base } = loadConfigYaml();

const base = new Base(_base)

const baseRender = base.render()

indexHtml = indexHtml.replace('<body>', `<body>${baseRender}`)

const outputDir = path.resolve(ROOT_DIR, './dist')

if(!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

fs.writeFileSync(path.resolve(outputDir, 'index.html'), indexHtml, 'utf-8')