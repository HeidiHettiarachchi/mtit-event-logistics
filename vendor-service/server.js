const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const vendorRoutes = require('./routes/vendorRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerDocument = require('./swagger');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use('/api/vendors', vendorRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ service: 'Vendor Service', status: 'Running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Vendor Service running on port ' + PORT);
});
