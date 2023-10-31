import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'REST API Docs',
      version: '1.0.0'
    }
  },
  apis: ['./src/*/*.controller.ts']
}
export const swaggerSpec = swaggerJSDoc(options)
