const buildHtml = require('./build-html')
const buildPDF = require('./build-pdf')

const bootstrap = async () => {
  console.log('Start...')
  const html = buildHtml()
  await buildPDF(html)
  console.log('Completed...')
}

bootstrap()