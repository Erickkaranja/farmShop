const express = require('express');
const router = require('./routes/index')
const mongoClient = require('./utils/db')

const port = process.env.port || 3000;

const app  = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
  mongoClient.connect().catch(console.dir);
})
