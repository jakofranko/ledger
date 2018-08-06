const Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

function Interval() {
    this.db = new sqlite3.Database('./log.sqlite', err => {
        if (err) console.error(err);
    });

    this.close = function() {
        this.db.close();
    }
}

Interval.prototype.getAll = function () {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Intervals', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = Interval;
