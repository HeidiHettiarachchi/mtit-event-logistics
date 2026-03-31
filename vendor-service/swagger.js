const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Vendor Service API',
    version: '1.0.0',
    description: 'CRUD API for managing vendors.',
  },
  servers: [{ url: 'http://localhost:5002' }],
  tags: [{ name: 'Vendor', description: 'Vendor management endpoints' }],
  paths: {
    '/api/vendors': {
      get: {
        tags: ['Vendor'],
        summary: 'Get all vendors',
        responses: {
          200: { description: 'List of vendors' },
        },
      },
      post: {
        tags: ['Vendor'],
        summary: 'Create a new vendor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Vendor' },
              example: {
              name: 'sample-name',
              serviceType: 'sample-serviceType',
              contact: 'sample-contact',
              availability: true
              },
            },
          },
        },
        responses: {
          201: { description: 'Vendor created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/vendors/{id}': {
      get: {
        tags: ['Vendor'],
        summary: 'Get vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Vendor found' },
          404: { description: 'Vendor not found' },
        },
      },
      put: {
        tags: ['Vendor'],
        summary: 'Update vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Vendor' },
            },
          },
        },
        responses: {
          200: { description: 'Vendor updated successfully' },
          404: { description: 'Vendor not found' },
        },
      },
      delete: {
        tags: ['Vendor'],
        summary: 'Delete vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Vendor deleted successfully' },
          404: { description: 'Vendor not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Vendor: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'sample' },
          serviceType: { type: 'string', example: 'sample' },
          contact: { type: 'string', example: 'sample' },
          availability: { type: 'boolean', example: true },
        },
        required: ['name', 'serviceType', 'contact', 'availability'],
      },
    },
  },
};

module.exports = swaggerDocument;

