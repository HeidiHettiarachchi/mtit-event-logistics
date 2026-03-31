const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Equipment Service API',
    version: '1.0.0',
    description: 'CRUD API for managing equipment.',
  },
  servers: [{ url: 'http://localhost:5003' }],
  tags: [{ name: 'Equipment', description: 'Equipment management endpoints' }],
  paths: {
    '/api/equipment': {
      get: {
        tags: ['Equipment'],
        summary: 'Get all equipment',
        responses: {
          200: { description: 'List of equipment' },
        },
      },
      post: {
        tags: ['Equipment'],
        summary: 'Create a new equipment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Equipment' },
              example: {
              name: 'sample-name',
              quantity: 1000,
              status: 'sample-status'
              },
            },
          },
        },
        responses: {
          201: { description: 'Equipment created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/equipment/{id}': {
      get: {
        tags: ['Equipment'],
        summary: 'Get equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Equipment found' },
          404: { description: 'Equipment not found' },
        },
      },
      put: {
        tags: ['Equipment'],
        summary: 'Update equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Equipment' },
            },
          },
        },
        responses: {
          200: { description: 'Equipment updated successfully' },
          404: { description: 'Equipment not found' },
        },
      },
      delete: {
        tags: ['Equipment'],
        summary: 'Delete equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Equipment deleted successfully' },
          404: { description: 'Equipment not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Equipment: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'sample' },
          quantity: { type: 'number', example: 1000 },
          status: { type: 'string', example: 'sample' },
        },
        required: ['name', 'quantity', 'status'],
      },
    },
  },
};

module.exports = swaggerDocument;

