// server.ts
import app  from './controllers/AppController';
const port = process.env.PORT || 3000;

app.listen(port);