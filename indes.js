const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Collect default Node.js metrics
client.collectDefaultMetrics({ register });

// Define a custom counter for HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_request_count',
  help: 'Count of HTTP requests made to the app',
  labelNames: ['method', 'route', 'statusCode'],
});

register.registerMetric(httpRequestCounter);

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Example route to increment the counter
app.get('/example', async (req, res) => {
  httpRequestCounter.inc({ method: req.method, route: req.route.path, statusCode: 200 });
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
