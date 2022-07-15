const http = require('http')
const path = require('path')
const fs = require('fs')
const { OUTPUT_PATH } = require('./constants/path')

const PORT = parseInt(process.env.PORT || 8888, 10)

const contentTypes = {
  css: 'text/css',
  js: 'text/javascript',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpg',
  pdf: 'application/pdf'
}

http.createServer(async (req, res) => {
  const pathname = req.url
  const filePath = path.join(__dirname, OUTPUT_PATH, (pathname === '/' ? 'index.html' : pathname))

  if(!fs.existsSync(filePath)) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
    return;
  }

  const extName = path.extname(filePath)
  const contentType = contentTypes[extName.replace('.', '')]
  res.writeHead(200, { 'Content-Type': contentType || 'text/html' })

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}).listen(PORT, (err) => {
  if(err) {
    return console.log(err)
  }
  console.log(`[🚀] Server is running at http://127.0.0.1:${PORT}`);
})