import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import { swaggerSpec } from './swagger/swagger.js';
import rootRouter from './rootRoutes.js';

const PORT = process.env.PORT || 3000;
const app = new express();

// routes
app.use('/', rootRouter);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.info(`Server in listening on port ${PORT}\
            \npid: ${process.pid}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
