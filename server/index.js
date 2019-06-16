/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./models');
const routes = require('./routes');

if (process.env.NODE_ENV !== 'production') {
  const dotEnv = require('dotenv');
  dotEnv.config();
}

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => console.log('Connected to the Database'))
  .catch(err => console.log(`Connection Failed ${err}`));

app.use(routes);

app.listen(PORT, () => {
  console.log(`
---------------------------------------------------
    Server Running on port ${PORT}:    
    Books API is ready on http://localhost:${PORT}
---------------------------------------------------
`);
});
