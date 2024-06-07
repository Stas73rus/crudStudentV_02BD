const url = require('url');

const userRoutes = require('./studentRoutes/studentRoutes');

const routeHandler = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;

    if (path === '/students' || path.startsWith('/students/')) {
        userRoutes(req, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Route not found'}));
    }

};

module.exports = routeHandler;