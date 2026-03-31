const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Event Service API',
    version: '1.0.0',
    description: 'CRUD API for managing events.',
  },
  servers: [{ url: 'http://localhost:5001' }],
  tags: [{ name: 'Event', description: 'Event management endpoints' }],
  paths: {
    '/api/events': {
      get: {
        tags: ['Event'],
        summary: 'Get all events',
        responses: {
          200: { description: 'List of events' },
        },
      },
      post: {
        tags: ['Event'],
        summary: 'Create a new event',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Event' },
              example: {
              name: 'sample-name',
              location: 'sample-location',
              date: '2026-12-20T18:00:00.000Z',
              budget: 1000,
              status: 'sample-status'
              },
            },
          },
        },
        responses: {
          201: { description: 'Event created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/events/{id}': {
      get: {
        tags: ['Event'],
        summary: 'Get event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Event found' },
          404: { description: 'Event not found' },
        },
      },
      put: {
        tags: ['Event'],
        summary: 'Update event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Event' },
            },
          },
        },
        responses: {
          200: { description: 'Event updated successfully' },
          404: { description: 'Event not found' },
        },
      },
      delete: {
        tags: ['Event'],
        summary: 'Delete event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Event deleted successfully' },
          404: { description: 'Event not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Event: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'sample' },
          location: { type: 'string', example: 'sample' },
          date: { type: 'string', format: 'date-time', example: '2026-12-20T18:00:00.000Z' },
          budget: { type: 'number', example: 1000 },
          status: { type: 'string', example: 'sample' },
        },
        required: ['name', 'location', 'date', 'budget', 'status'],
      },
    },
  },
};

module.exports = swaggerDocument;

