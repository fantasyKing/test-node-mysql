import HTTP from './server/http';

async function main() {
  try {
    const port = process.env.PORT || 4040;
    const server = new HTTP({ port });
    const router = require('./router');
    server.use('/', router.rootRouter);
    server.use('/v1', router.apiRouter);
    server.start();

    process.on('uncaughtException', err => {
      logger.error('uncatchd exception, ', err.message, err);
      process.exit(0);
    });
  } catch (e) {
    console.log('main error = ', e, e.stack);
  }
}

main();
