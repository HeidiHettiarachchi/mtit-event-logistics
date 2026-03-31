const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Staff Service API',
    version: '1.0.0',
    description: 'CRUD API for managing staff.',
  },
  servers: [{ url: 'http://localhost:5004' }],
  tags: [{ name: 'Staff', description: 'Staff management endpoints' }],
  paths: {
    '/api/staff': {
      get: {
        tags: ['Staff'],
        summary: 'Get all staff',
        responses: {
          200: { description: 'List of staff' },
        },
      },
      post: {
        tags: ['Staff'],
        summary: 'Create a new staff',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Staff' },
              example: {
              name: 'sample-name',
              role: 'sample-role',
              contact: 'sample-contact',
              availability: true
              },
            },
          },
        },
        responses: {
          201: { description: 'Staff created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/staff/{id}': {
      get: {
        tags: ['Staff'],
        summary: 'Get staff by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Staff found' },
          404: { description: 'Staff not found' },
        },
      },
      put: {
        tags: ['Staff'],
        summary: 'Update staff by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Staff' },
            },
          },
        },
        responses: {
          200: { description: 'Staff updated successfully' },
          404: { description: 'Staff not found' },
        },
      },
      delete: {
        tags: ['Staff'],
        summary: 'Delete staff by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Staff deleted successfully' },
          404: { description: 'Staff not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Staff: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'sample' },
          role: { type: 'string', example: 'sample' },
          contact: { type: 'string', example: 'sample' },
          availability: { type: 'boolean', example: true },
        },
        required: ['name', 'role', 'contact', 'availability'],
      },
    },
  },
};

module.exports = swaggerDocument;

