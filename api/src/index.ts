import express from 'express';
import bodyParser from 'body-parser';

import mountedRoutes from '@routes/index';

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define the root path with a greeting message
mountedRoutes(app);

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
