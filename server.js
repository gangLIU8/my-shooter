const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'D:\\MyShooter';
const types = {
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(ROOT, url === '/' ? '/index.html' : url);
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(f);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8080, '0.0.0.0', () => console.log('http://localhost:8080'));
