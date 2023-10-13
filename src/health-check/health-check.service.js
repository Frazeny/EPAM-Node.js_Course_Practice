class HealthCheckService {
    getStatus(){
        return {
            status: 'OK',
            uptime: process.uptime(),
            pid: process.pid
        }
    }
}

export default new HealthCheckService();