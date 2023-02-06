const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const { DIST_DIR } = require('../constants/path')

const pdfFileName = 'resume.pdf'

const buildPDF = async (html) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.4in',
      right: '0.4in',
    }
  })

  await browser.close()

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR)
  }

  fs.writeFileSync(path.resolve(DIST_DIR, pdfFileName), pdf)

  return pdf
}

module.exports = buildPDF