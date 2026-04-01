const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Transport Service API',
    version: '1.0.0',
    description: 'CRUD API for managing transport.',
  },
  servers: [{ url: 'http://localhost:5005' }],
  tags: [{ name: 'Transport', description: 'Transport management endpoints' }],
  paths: {
    '/api/transport': {
      get: {
        tags: ['Transport'],
        summary: 'Get all transport',
        responses: {
          200: { description: 'List of transport' },
        },
      },
      post: {
        tags: ['Transport'],
        summary: 'Create a new transport',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Transport' },
              example: {
              vehicleType: 'sample-vehicleType',
              driverName: 'sample-driverName',
              availability: true
              },
            },
          },
        },
        responses: {
          201: { description: 'Transport created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/transport/{id}': {
      get: {
        tags: ['Transport'],
        summary: 'Get transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Transport found' },
          404: { description: 'Transport not found' },
        },
      },
      put: {
        tags: ['Transport'],
        summary: 'Update transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Transport' },
            },
          },
        },
        responses: {
          200: { description: 'Transport updated successfully' },
          404: { description: 'Transport not found' },
        },
      },
      delete: {
        tags: ['Transport'],
        summary: 'Delete transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Transport deleted successfully' },
          404: { description: 'Transport not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Transport: {
        type: 'object',
        properties: {
          vehicleType: { type: 'string', example: 'sample' },
          driverName: { type: 'string', example: 'sample' },
          availability: { type: 'boolean', example: true },
        },
        required: ['vehicleType', 'driverName', 'availability'],
      },
    },
  },
};

module.exports = swaggerDocument;

