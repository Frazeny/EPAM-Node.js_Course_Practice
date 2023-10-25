import { Router } from 'express';

import { ROUTES } from './health-check.enum';
import { getHealthCheckStatus } from './health-check.controller';

const healthRouter = Router();

healthRouter.route(ROUTES.ROOT).get(getHealthCheckStatus);

export default healthRouter;
