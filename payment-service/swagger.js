const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Payment Service API',
    version: '1.0.0',
    description: 'CRUD API for managing payments.',
  },
  servers: [{ url: 'http://localhost:5006' }],
  tags: [{ name: 'Payment', description: 'Payment management endpoints' }],
  paths: {
    '/api/payments': {
      get: {
        tags: ['Payment'],
        summary: 'Get all payments',
        responses: {
          200: { description: 'List of payments' },
        },
      },
      post: {
        tags: ['Payment'],
        summary: 'Create a new payment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Payment' },
              example: {
              eventId: 'sample-eventId',
              amount: 1000,
              status: 'sample-status'
              },
            },
          },
        },
        responses: {
          201: { description: 'Payment created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/payments/{id}': {
      get: {
        tags: ['Payment'],
        summary: 'Get payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Payment found' },
          404: { description: 'Payment not found' },
        },
      },
      put: {
        tags: ['Payment'],
        summary: 'Update payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Payment' },
            },
          },
        },
        responses: {
          200: { description: 'Payment updated successfully' },
          404: { description: 'Payment not found' },
        },
      },
      delete: {
        tags: ['Payment'],
        summary: 'Delete payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Payment deleted successfully' },
          404: { description: 'Payment not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Payment: {
        type: 'object',
        properties: {
          eventId: { type: 'string', example: 'sample' },
          amount: { type: 'number', example: 1000 },
          status: { type: 'string', example: 'sample' },
        },
        required: ['eventId', 'amount', 'status'],
      },
    },
  },
};

module.exports = swaggerDocument;

