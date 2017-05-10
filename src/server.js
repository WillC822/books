const express = require('express');

const app = express();

app.get ('/', (req,res) =>{
  res.json({healthy: true})
});

app.listen(3000);
