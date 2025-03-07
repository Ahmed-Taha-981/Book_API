const express = require('express');
const app = express();
const port = process.env.PORT || 1245;
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

const userRoutes = require('/Router/users.js');
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
