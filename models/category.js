var Promise = require('bluebird');
const db = require('sqlite');


module.exports = {
    create: function(props) {
        return db.open('./log.sqlite')
            .then(() => db.run("INSERT INTO Categories (name) VALUES (?)", [props.name]))
            .then(stmt => db.get("SELECT * FROM Categories WHERE id = ?", [stmt.lastID]))
    },
    get: function(id) {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Categories WHERE id = ?', [id]));
    },
    getAll: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Categories'));
    },
    update: function(id, updates) {
        return db.open('./log.sqlite')
            .then(() => db.run("UPDATE Categories SET name = ? WHERE id = ?", [updates.name, id]))
            .then(() => db.get("SELECT * FROM Categories WHERE id = ?", [id]));
    },
    delete: function(id) {
        let cat;
        return db.open('./log.sqlite')
            .then(() => this.get(id))
            .then(category => {
                cat = category;
                return db.run("DELETE FROM Categories WHERE id = ?", [id]);
            })
            .then(() => Promise.resolve(cat));
    }
};