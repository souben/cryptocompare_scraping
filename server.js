const express = require('express');


const app = express();
const port = process.env.PORT || 3001;

const routes = require('./api/routes');
routes(app);


const db = require("./models/index");
db.sequelize.sync({ force: true})
  .then( () => console.log("Drop and re-sync db"))


app.listen( port, () => console.log('Server started on port:' + port));