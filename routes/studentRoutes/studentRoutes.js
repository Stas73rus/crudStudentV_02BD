const url = require('url');

const listStudents = require('./listStudents');
const createStudent = require('./createStudent');
const getStudent = require('./getStudent');
const updateStudent = require('./updateStudent');
const deleteStudent = require('./deleteStudent');

const studentRoutes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parseUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    if (path === '/students' && method === 'GET') {
        listStudents(req, res);
    } else if (path === '/students' && method === 'POST') {
        createStudent(req, res);
    } else if (path.startsWith('/students/') && method === 'GET') {
        getStudent(req, res);
    } else if (path.startsWith('/students/') && method === 'PUT') {
        updateStudent(req, res);
    } else if (path.startsWith('/students/') && method === 'DELETE') {
        deleteStudent(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Route not found in students'}));
    }
};

module.exports = studentRoutes