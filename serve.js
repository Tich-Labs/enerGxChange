const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Try .html extension if no extension
  if (!path.extname(filePath)) {
    filePath += '.html';
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : 
                     ext === '.css' ? 'text/css' :
                     ext === '.js' ? 'text/javascript' : 'text/plain';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
  console.log('Landing page: http://localhost:8080/');
  console.log('Next.js app: http://localhost:8080/enerGXchange/');
});
