import HealthCheckService from './health-check.service.js';

export const getHealthCheckStatus = (req, res) => {
    try {
        const status = HealthCheckService.getStatus();
        res.status(200).json(status)
    } catch (e) {
        res.status(500).json(e)
    }
}