const express = require('express');

const server = express();

const projectsRouters = require('./data/routers/projects-routers');
const actionsRouters = require('./data/routers/actions-routers');

server.use(express.json());
server.use('/api/projects', projectsRouters);
server.use('/api/actions', actionsRouters);


module.exports = server;