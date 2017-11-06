var Promise = require('bluebird');
const db = require('sqlite');


module.exports = {
    create: function(props) {
        return db.open('./log.sqlite')
            .then(() => db.run(
                "INSERT INTO Goals (name, unit, amount, category_id, interval_id) VALUES (?, ?, ?, ?, ?)",
                [
                    props.name,
                    props.unit,
                    props.amount,
                    props.category_id,
                    props.interval_id
                ]
            ))
            .then(stmt => db.get("SELECT * FROM Goals WHERE id = ?", [stmt.lastID]))
    },
    get: function(id) {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Goals WHERE id = ?', [id]));
    },
    getAll: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Goals'));
    },
    update: function(id, updates) {
        return db.open('./log.sqlite')
            .then(() => db.run("UPDATE Goals SET name = ?, unit = ?, amount = ?, category_id = ?, interval_id = ? WHERE id = ?",
                [
                    updates.name,
                    updates.unit,
                    updates.amount,
                    updates.category_id,
                    updates.interval_id,
                    id
                ]
            ))
            .then(() => db.get("SELECT * FROM Goals WHERE id = ?", [id]));
    },
    delete: function(id) {
        let cat;
        return db.open('./log.sqlite')
            .then(() => this.get(id))
            .then(category => {
                cat = category;
                return db.run("DELETE FROM Goals WHERE id = ?", [id]);
            })
            .then(() => Promise.resolve(cat));
    }
};