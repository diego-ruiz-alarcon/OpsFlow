const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const { URL } = require('node:url');

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 5500;
const ROOT = __dirname;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const getLanAddresses = () => Object.values(os.networkInterfaces())
  .flat()
  .filter((network) => network && network.family === 'IPv4' && !network.internal)
  .map((network) => network.address);

const server = http.createServer((request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    const requestedPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = requestedPath === '/' ? '/index.html' : requestedPath;
    const filePath = path.resolve(ROOT, `.${relativePath}`);

    if (!filePath.startsWith(ROOT + path.sep)) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Acceso denegado');
      return;
    }

    const file = fs.readFileSync(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    response.end(file);
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(status === 404 ? 'Archivo no encontrado' : 'Error interno del servidor');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`OpsFlow disponible en http://localhost:${PORT}`);
  const addresses = getLanAddresses();
  if (addresses.length === 0) {
    console.log('No se detectó una IP de red local. Verifica que el notebook esté conectado a la red.');
  } else {
    console.log('Comparte una de estas direcciones con equipos conectados a la misma red:');
    addresses.forEach((address) => console.log(`  http://${address}:${PORT}`));
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso. Ejecuta con otro puerto: set PORT=5501 && npm start`);
  } else {
    console.error('No fue posible iniciar el servidor:', error.message);
  }
  process.exitCode = 1;
});
