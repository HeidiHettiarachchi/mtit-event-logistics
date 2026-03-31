require('dotenv').config(); // Load .env variables
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 5000;

// Microservice URLs from environment variables (with defaults for local development)
const EVENT_URL = process.env.EVENT_URL || 'http://localhost:5001';
const VENDOR_URL = process.env.VENDOR_URL || 'http://localhost:5002';
const EQUIPMENT_URL = process.env.EQUIPMENT_URL || 'http://localhost:5003';
const STAFF_URL = process.env.STAFF_URL || 'http://localhost:5004';
const TRANSPORT_URL = process.env.TRANSPORT_URL || 'http://localhost:5005';
const PAYMENT_URL = process.env.PAYMENT_URL || 'http://localhost:5006';

console.log('API Gateway Configuration:');
console.log(`  Event Service: ${EVENT_URL}`);
console.log(`  Vendor Service: ${VENDOR_URL}`);
console.log(`  Equipment Service: ${EQUIPMENT_URL}`);
console.log(`  Staff Service: ${STAFF_URL}`);
console.log(`  Transport Service: ${TRANSPORT_URL}`);
console.log(`  Payment Service: ${PAYMENT_URL}`);

// When mounted, Express strips the mount path. Target full API base paths per service.
app.use('/api/events', createProxyMiddleware({ target: `${EVENT_URL}/api/events`, changeOrigin: true }));
app.use('/api/vendors', createProxyMiddleware({ target: `${VENDOR_URL}/api/vendors`, changeOrigin: true }));
app.use('/api/equipment', createProxyMiddleware({ target: `${EQUIPMENT_URL}/api/equipment`, changeOrigin: true }));
app.use('/api/staff', createProxyMiddleware({ target: `${STAFF_URL}/api/staff`, changeOrigin: true }));
app.use('/api/transport', createProxyMiddleware({ target: `${TRANSPORT_URL}/api/transport`, changeOrigin: true }));
app.use('/api/payments', createProxyMiddleware({ target: `${PAYMENT_URL}/api/payments`, changeOrigin: true }));

// Swagger definition for API Gateway with detailed schemas and examples
const gatewaySwagger = {
  openapi: '3.0.0',
  info: {
    title: 'Event Logistics API Gateway',
    version: '1.0.0',
    description: 'Unified API Gateway for Event Logistics Management System',
    contact: { name: 'API Support' },
  },
  servers: [{ url: `http://localhost:${PORT}`, description: 'Local Development Server' }],
  tags: [
    { name: 'Events', description: 'Event management endpoints' },
    { name: 'Vendors', description: 'Vendor management endpoints' },
    { name: 'Equipment', description: 'Equipment management endpoints' },
    { name: 'Staff', description: 'Staff management endpoints' },
    { name: 'Transport', description: 'Transport management endpoints' },
    { name: 'Payments', description: 'Payment management endpoints' },
  ],
  paths: {
    '/api/events': {
      get: {
        tags: ['Events'],
        summary: 'Get all events',
        responses: { 200: { description: 'List of all events' } },
      },
      post: {
        tags: ['Events'],
        summary: 'Create a new event',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  date: { type: 'string', format: 'date' },
                  location: { type: 'string' },
                  budget: { type: 'number' },
                  status: { type: 'string' },
                },
                required: ['name', 'date', 'location'],
              },
              example: { name: 'Birthday Party', date: '2026-03-25', location: 'Colombo', budget: 50000, status: 'Planning' },
            },
          },
        },
        responses: { 201: { description: 'Event created successfully' } },
      },
    },
    '/api/events/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Get event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Event ID' }],
        responses: { 200: { description: 'Event details' }, 404: { description: 'Event not found' } },
      },
      put: {
        tags: ['Events'],
        summary: 'Update event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Event ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  date: { type: 'string', format: 'date' },
                  location: { type: 'string' },
                  budget: { type: 'number' },
                  status: { type: 'string' },
                },
              },
              example: { name: 'Birthday Party', date: '2026-03-25', location: 'Colombo' },
            },
          },
        },
        responses: { 200: { description: 'Event updated successfully' }, 404: { description: 'Event not found' } },
      },
      delete: {
        tags: ['Events'],
        summary: 'Delete event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Event ID' }],
        responses: { 200: { description: 'Event deleted successfully' }, 404: { description: 'Event not found' } },
      },
    },
    '/api/vendors': {
      get: {
        tags: ['Vendors'],
        summary: 'Get all vendors',
        responses: { 200: { description: 'List of all vendors' } },
      },
      post: {
        tags: ['Vendors'],
        summary: 'Create a new vendor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  contact: { type: 'string' },
                  serviceType: { type: 'string' },
                  availability: { type: 'boolean' },
                },
                required: ['name', 'contact'],
              },
              example: { name: 'Food Stall Co.', contact: '0712345678', serviceType: 'Catering', availability: true },
            },
          },
        },
        responses: { 201: { description: 'Vendor created successfully' } },
      },
    },
    '/api/vendors/{id}': {
      get: {
        tags: ['Vendors'],
        summary: 'Get vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Vendor ID' }],
        responses: { 200: { description: 'Vendor details' }, 404: { description: 'Vendor not found' } },
      },
      put: {
        tags: ['Vendors'],
        summary: 'Update vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Vendor ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  contact: { type: 'string' },
                  serviceType: { type: 'string' },
                  availability: { type: 'boolean' },
                },
              },
              example: { name: 'Food Stall Co.', contact: '0712345678' },
            },
          },
        },
        responses: { 200: { description: 'Vendor updated successfully' }, 404: { description: 'Vendor not found' } },
      },
      delete: {
        tags: ['Vendors'],
        summary: 'Delete vendor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Vendor ID' }],
        responses: { 200: { description: 'Vendor deleted successfully' }, 404: { description: 'Vendor not found' } },
      },
    },
    '/api/equipment': {
      get: {
        tags: ['Equipment'],
        summary: 'Get all equipment',
        responses: { 200: { description: 'List of all equipment' } },
      },
      post: {
        tags: ['Equipment'],
        summary: 'Create new equipment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  quantity: { type: 'number' },
                  status: { type: 'string' },
                },
                required: ['name', 'quantity'],
              },
              example: { name: 'Chair', quantity: 50, status: 'Available' },
            },
          },
        },
        responses: { 201: { description: 'Equipment created successfully' } },
      },
    },
    '/api/equipment/{id}': {
      get: {
        tags: ['Equipment'],
        summary: 'Get equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Equipment ID' }],
        responses: { 200: { description: 'Equipment details' }, 404: { description: 'Equipment not found' } },
      },
      put: {
        tags: ['Equipment'],
        summary: 'Update equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Equipment ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  quantity: { type: 'number' },
                  status: { type: 'string' },
                },
              },
              example: { name: 'Chair', quantity: 50 },
            },
          },
        },
        responses: { 200: { description: 'Equipment updated successfully' }, 404: { description: 'Equipment not found' } },
      },
      delete: {
        tags: ['Equipment'],
        summary: 'Delete equipment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Equipment ID' }],
        responses: { 200: { description: 'Equipment deleted successfully' }, 404: { description: 'Equipment not found' } },
      },
    },
    '/api/staff': {
      get: {
        tags: ['Staff'],
        summary: 'Get all staff members',
        responses: { 200: { description: 'List of all staff members' } },
      },
      post: {
        tags: ['Staff'],
        summary: 'Create new staff member',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  role: { type: 'string' },
                  contact: { type: 'string' },
                  availability: { type: 'boolean' },
                },
                required: ['name', 'role'],
              },
              example: { name: 'John Doe', role: 'Manager', contact: '0712345678', availability: true },
            },
          },
        },
        responses: { 201: { description: 'Staff member created successfully' } },
      },
    },
    '/api/staff/{id}': {
      get: {
        tags: ['Staff'],
        summary: 'Get staff member by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Staff ID' }],
        responses: { 200: { description: 'Staff member details' }, 404: { description: 'Staff member not found' } },
      },
      put: {
        tags: ['Staff'],
        summary: 'Update staff member by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Staff ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  role: { type: 'string' },
                  contact: { type: 'string' },
                  availability: { type: 'boolean' },
                },
              },
              example: { name: 'John Doe', role: 'Manager' },
            },
          },
        },
        responses: { 200: { description: 'Staff member updated successfully' }, 404: { description: 'Staff member not found' } },
      },
      delete: {
        tags: ['Staff'],
        summary: 'Delete staff member by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Staff ID' }],
        responses: { 200: { description: 'Staff member deleted successfully' }, 404: { description: 'Staff member not found' } },
      },
    },
    '/api/transport': {
      get: {
        tags: ['Transport'],
        summary: 'Get all transport',
        responses: { 200: { description: 'List of all transport' } },
      },
      post: {
        tags: ['Transport'],
        summary: 'Create new transport',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  vehicleType: { type: 'string' },
                  driverName: { type: 'string' },
                  availability: { type: 'boolean' },
                },
                required: ['vehicleType', 'driverName'],
              },
              example: { vehicleType: 'Van', driverName: 'Ahmed', availability: true },
            },
          },
        },
        responses: { 201: { description: 'Transport created successfully' } },
      },
    },
    '/api/transport/{id}': {
      get: {
        tags: ['Transport'],
        summary: 'Get transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Transport ID' }],
        responses: { 200: { description: 'Transport details' }, 404: { description: 'Transport not found' } },
      },
      put: {
        tags: ['Transport'],
        summary: 'Update transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Transport ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  vehicleType: { type: 'string' },
                  driverName: { type: 'string' },
                  availability: { type: 'boolean' },
                },
              },
              example: { vehicleType: 'Van', driverName: 'Ahmed' },
            },
          },
        },
        responses: { 200: { description: 'Transport updated successfully' }, 404: { description: 'Transport not found' } },
      },
      delete: {
        tags: ['Transport'],
        summary: 'Delete transport by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Transport ID' }],
        responses: { 200: { description: 'Transport deleted successfully' }, 404: { description: 'Transport not found' } },
      },
    },
    '/api/payments': {
      get: {
        tags: ['Payments'],
        summary: 'Get all payments',
        responses: { 200: { description: 'List of all payments' } },
      },
      post: {
        tags: ['Payments'],
        summary: 'Create new payment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  eventId: { type: 'string' },
                  amount: { type: 'number' },
                  status: { type: 'string' },
                },
                required: ['eventId', 'amount'],
              },
              example: { eventId: '507f1f77bcf86cd799439011', amount: 1000, status: 'Completed' },
            },
          },
        },
        responses: { 201: { description: 'Payment created successfully' } },
      },
    },
    '/api/payments/{id}': {
      get: {
        tags: ['Payments'],
        summary: 'Get payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Payment ID' }],
        responses: { 200: { description: 'Payment details' }, 404: { description: 'Payment not found' } },
      },
      put: {
        tags: ['Payments'],
        summary: 'Update payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Payment ID' }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  eventId: { type: 'string' },
                  amount: { type: 'number' },
                  status: { type: 'string' },
                },
              },
              example: { amount: 1000, status: 'Completed' },
            },
          },
        },
        responses: { 200: { description: 'Payment updated successfully' }, 404: { description: 'Payment not found' } },
      },
      delete: {
        tags: ['Payments'],
        summary: 'Delete payment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Payment ID' }],
        responses: { 200: { description: 'Payment deleted successfully' }, 404: { description: 'Payment not found' } },
      },
    },
  },
};

// Serve Swagger UI for Gateway
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(gatewaySwagger));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Event Logistics API Gateway',
    status: 'Running',
    version: '1.0.0',
    documentation: 'http://localhost:' + PORT + '/api-docs',
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Gateway is healthy' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Gateway route not found', path: req.path });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n✨ API Gateway running on port ${PORT}`);
  console.log(`📚 Swagger UI available at http://localhost:${PORT}/api-docs\n`);
});