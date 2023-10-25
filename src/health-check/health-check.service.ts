import { type IHealthStatus } from './health-check.interface'

class HealthCheckService {
  getStatus (): IHealthStatus {
    return {
      status: 'OK',
      uptime: process.uptime(),
      pid: process.pid
    }
  }
}

export default new HealthCheckService()
