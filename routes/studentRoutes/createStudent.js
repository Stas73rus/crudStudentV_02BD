const data = require('../../sql-data');

module.exports = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const parseBody = new URLSearchParams(body);
        const name = parseBody.get('name');
        const age = parseBody.get('age');
        const schoolSubject = parseBody.get('schoolSubject')

        if (name && age) {
            const student = {name, age: parseInt(age), schoolSubject};
            const createStudent = await data.addStudent(student);
            res.writeHead(201);
            res.end(JSON.stringify(createStudent));
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({message: 'Name and age are required'}));
        }
    });
};