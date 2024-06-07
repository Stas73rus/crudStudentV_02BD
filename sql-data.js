
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('crudstudent.db');

db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    schoolSubject TEXT NOT NULL
)`);

module.exports = {
    async getStudents() {
        try {
            const students = await new Promise((resolve, reject) => {
                db.all('SELECT * FROM students', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
            return students;
        } catch (err) {
            return null;
        }
    },

    async addStudent(student) {
        const lastID = await new Promise((resolve, reject) => {
            db.run('INSERT INTO students (name, age, schoolSubject) VALUES (?, ?, ?)', [student.name, student.age, student.schoolSubject], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
        return {id: lastID, ...student};
    },

    async updateStudent(id, updatedData) {
        const changes = await new Promise((resolve, reject) => {
            db.run('UPDATE students SET name = ?, age = ?,  schoolSubject = ? WHERE id = ?', [updatedData.name, updatedData.age, updatedData.schoolSubject, id], function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes);
                }
            });
        });
        if (changes === 0) {
            return null;
        }
        return this.getStudentById(id);
    },

    async deleteStudent(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return changes > 0;
    },

    async getStudentById(id) {
        const student = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
        return student;
    }
};
