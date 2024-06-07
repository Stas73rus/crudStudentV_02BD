const data = require('../../sql-data');

module.exports = async (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    const student = await data.getStudentById(id);

    if (student) {
        res.writeHead(200);
        res.end(JSON.stringify(student));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Student not found'}));
    }
};