const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models/index');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');

const app = express();

app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);
// force: true kao migrate:fresh --seed na svaki restart servera
sequelize.sync({force: true})
    .then(() => {
        app.listen(config.port);
        console.log("Server started on port " + config.port)
    })

