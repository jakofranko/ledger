var Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

function Goal() {
    this.db = new sqlite3.Database('./log.sqlite', (err) => {
        if (err) console.error(err);
    });

    this.close = function() {
        this.db.close();
    }
}

Goal.prototype.create = function(props) {
    return new Promise((resolve, reject) => {
        let db = this.db;
        db.serialize();
        db.run("INSERT INTO Goals (name, unit, amount, category_id, interval_id) VALUES (?, ?, ?, ?, ?)",
            [
                props.name,
                props.unit,
                props.amount,
                props.category_id,
                props.interval_id
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Goals WHERE id = ?", this.lastID, function(err, rows) {
                        if (err) reject(err);
                        else resolve(rows);
                    })
                }
            }
        );
    });
};
Goal.prototype.get = function(id) {
    return new Promise((resolve, reject) => {
        this.db.get('SELECT * FROM Goals WHERE id = ?', id, function(err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
};
Goal.prototype.getAll= function() {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Goals', function(err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
Goal.prototype.update = function(id, updates) {
    let db = this.db;
    return new Promise((resolve, reject) => {
        db.run("UPDATE Goals SET name = ?, unit = ?, amount = ?, category_id = ?, interval_id = ? WHERE id = ?",
            [
                updates.name,
                updates.unit,
                updates.amount,
                updates.category_id,
                updates.interval_id,
                id
            ],
            function(err) {
                if (err) reject(err);
                else {
                    db.get("SELECT * FROM Goals WHERE id = ?", this.lastID, function(err, row) {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            }
        );
    });
};
Goal.prototype.delete = function(id) {
    let db = this.db;
    let g;
    return new Promise((resolve, reject) => {
        this.get(id)
            .then(goal => {
                g = goal;
                db.run("DELETE FROM Goals WHERE id = ?", id, function(err) {
                    if (err) reject(err);
                    else resolve(g);
                });
            });
    });
};

module.exports = Goal;
