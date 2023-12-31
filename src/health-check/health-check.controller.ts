import { type Request, type RequestHandler, type Response } from 'express'

import HealthCheckService from './health-check.service'

/**
 * @openapi
 * /health-check:
 *   get:
 *     summary: Get the health check status
 *     responses:
 *       200:
 *         description: Health check status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                   format: float
 *                 pid:
 *                   type: integer
 *             example:
 *               status: "OK"
 *               uptime: 1234.567
 *               pid: 12345
 */
export const getHealthCheckStatus: RequestHandler = (
  req: Request,
  res: Response
) => {
  try {
    const status = HealthCheckService.getStatus()
    res.status(200).json(status)
  } catch (e) {
    res.status(500).json(e)
  }
}
