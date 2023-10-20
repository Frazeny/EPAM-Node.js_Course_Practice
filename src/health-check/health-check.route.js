import { Router } from 'express';

import { ROUTES } from './health-check.enum.js';
import { getHealthCheckStatus } from './health-check.controller.js';

const healthRouter = new Router();

healthRouter.route(ROUTES.ROOT).get(getHealthCheckStatus);

export default healthRouter;
