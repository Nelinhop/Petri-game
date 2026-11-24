const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// O servidor apenas serve o frontend estático (pasta public)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Placa de petri em http://localhost:${PORT}`);
});
