const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const transportRoutes = require('./routes/transportRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerDocument = require('./swagger');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use('/api/transport', transportRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ service: 'Transport Service', status: 'Running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Transport Service running on port ' + PORT);
});
