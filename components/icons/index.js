const fs = require('fs')
const path = require('path')

const icons = [
  'mail',
  'phone',
  'website',
  'pdf',
  'github'
]

/**
 * @param {string} name 
 * @returns icon html string
 */
const getIcon = (name) => {
  const iconPath = path.resolve(__dirname, `${name}.html`)
  if(fs.existsSync(iconPath)) {
    return fs.readFileSync(iconPath, 'utf-8')
  }
  return ''
}

/**
 * 
 * @param {Handlebars} hbs 
 */
const registerIcons = (hbs) => {
  icons.forEach(item => {
    hbs.registerPartial(`${item}Icon`, getIcon(item))
  })
}

module.exports = registerIcons