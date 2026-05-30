const { createServer } = require('vite');

async function start() {
  const server = await createServer({
    configFile: 'D:/fas2_video/landing-page/vite.config.js',
    root: 'D:/fas2_video/landing-page',
    server: { port: 3003, host: true }
  });
  await server.listen();
  server.printUrls();
}

start();
