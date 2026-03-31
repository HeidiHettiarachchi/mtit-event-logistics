const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const equipmentRoutes = require('./routes/equipmentRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerDocument = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use('/api/equipment', equipmentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ service: 'Equipment Service', status: 'Running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log('Equipment Service running on port ' + PORT);
    });
  } catch (error) {
    console.error('Failed to start Equipment Service:', error.message);
    process.exit(1);
  }
};

startServer();
