class HealthCheckService {
    getStatus(){
        return {
            status: 'OK',
            uptime: process.uptime(),
        }
    }
}

export default new HealthCheckService();