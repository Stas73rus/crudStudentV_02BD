const data = require('../../sql-data');

module.exports = async (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const parseBody = new URLSearchParams(body);
        const updatedData = {};
        parseBody.forEach((value, key) => {
            updatedData[key] = key === 'age' ? parseInt(value) : value;
        });

        const updatedStudent = await data.updateStudent(id, updatedData);

        if (updatedStudent) {
            res.writeHead(200);
            res.end(JSON.stringify(updatedStudent));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'Student not found'}));
        }

    });
};