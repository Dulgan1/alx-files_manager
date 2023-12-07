const express = require('express');
const router = require('./routes/index')

const app = express();
const port = 5000;

aoo.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
