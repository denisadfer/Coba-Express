const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const host = 'localhost'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
});

const appRoute = require('./src/routes/routes');
app.use('/', appRoute);

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
