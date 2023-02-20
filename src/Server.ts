// server.ts
import app from './controllers/AppController';

// eslint-disable-next-line no-magic-numbers
const port = process.env.PORT || 3000;

app.listen(port);
