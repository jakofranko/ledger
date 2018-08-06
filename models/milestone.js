var Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

function Milestone() {
    this.db = new sqlite3.Database('./log.sqlite', (err) => {
        if (err) console.error(err);
    });

    this.close = function() {
        this.db.close();
    }
}

Milestone.prototype.create = function (props) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        db.run(
            "INSERT INTO Milestones (goal_id, name, done) VALUES (?, ?, 0)", // default done to 0
            [
                props.goal_id,
                props.name
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Milestones WHERE id = ?", this.lastID, function(err, row) {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            }
        );
    });
};
Milestone.prototype.get = function (id) {
    return new Promise((resolve, reject) => {
        this.db.get('SELECT * FROM Milestones WHERE id = ?', id, function(err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};
Milestone.prototype.getAll = function () {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Milestones', function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Milestone.prototype.getDone = function () {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Milestones WHERE done = 1', function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Milestone.prototype.getNotDone = function () {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Milestones WHERE done = 0', function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Milestone.prototype.update = function (id, updates) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        db.run("UPDATE Milestones SET goal_id = ?, name = ?, done = ?, date = ? WHERE id = ?",
            [
                updates.goal_id,
                updates.name,
                Number(updates.done),
                updates.date,
                id
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Milestones WHERE id = ?", id, function(err, row) {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            }
        );
    });
};
Milestone.prototype.delete = function (id) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        let ms;
        this.get(id)
        .then(milestone => {
            ms = milestone;
            return db.run("DELETE FROM Milestones WHERE id = ?", id, function(err) {
                if (err) reject(err);
                else resolve(ms);
            });
        })
        .catch(err => reject(err));
    });
};

module.exports = Milestone;
