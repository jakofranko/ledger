var Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

function Log() {
    this.db = new sqlite3.Database('./log.sqlite', (err) => {
        if (err) console.error(err);
    });

    this.close = function() {
        this.db.close();
    }
}

Log.prototype.create = function(props) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        db.run(
            "INSERT INTO Logs (description, goal_id, amount, date, duration) VALUES (?, ?, ?, ?, ?)",
            [
                props.description,
                props.goal_id,
                props.amount,
                props.date,
                props.duration
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Logs WHERE id = ?", this.lastID, function(err, row) {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            }
        );
    });
};
Log.prototype.get = function(id) {
    return new Promise((resolve, reject) => {
        this.db.get('SELECT * FROM Logs WHERE id = ?', id, function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Log.prototype.getAll = function() {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Logs', function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Log.prototype.update = function(id, updates) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        this.db.run("UPDATE Logs SET description = ?, goal_id = ?, amount = ?, date = ?, duration = ? WHERE id = ?",
            [
                updates.description,
                updates.goal_id,
                updates.amount,
                updates.date,
                updates.duration,
                id
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Logs WHERE id = ?", id, function(err, row) {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
    });
};
Log.prototype.delete = function(id) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        let l;
        this.get(id)
        .then(log => {
            l = log;
            db.run("DELETE FROM Logs WHERE id = ?", id, function(err) {
                if (err) reject(err);
                else resolve(l);
            });
        });
    });
};

module.exports = Log;
