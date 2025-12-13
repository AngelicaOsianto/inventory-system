import express from 'express';
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/test.routes.js';


const app = express();

app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

// HEALTH CHECK (WAJIB)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Inventory API running',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

export default app;
