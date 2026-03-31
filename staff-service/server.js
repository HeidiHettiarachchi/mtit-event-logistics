const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const staffRoutes = require('./routes/staffRoutes');
const errorHandler = require('./middlewares/errorHandler');
const swaggerDocument = require('./swagger');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json());
app.use('/api/staff', staffRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ service: 'Staff Service', status: 'Running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Staff Service running on port ' + PORT);
});
