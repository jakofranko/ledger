var Promise = require('bluebird');
const db = require('sqlite');


module.exports = {
    create: function(props) {
        return db.open('./log.sqlite')
            .then(() => db.run(
                "INSERT INTO Milestones (goal_id, name, done) VALUES (?, ?, 0)", // default done to 0
                [
                    props.goal_id,
                    props.name
                ]
            ))
            .then(stmt => db.get("SELECT * FROM Milestones WHERE id = ?", [stmt.lastID]))
    },
    get: function(id) {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Milestones WHERE id = ?', [id]));
    },
    getAll: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Milestones'));
    },
    getDone: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Milestones WHERE done = 1'));
    },
    getNotDone: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Milestones WHERE done = 0'));
    },
    update: function(id, updates) {
        return db.open('./log.sqlite')
            .then(() => db.run("UPDATE Milestones SET goal_id = ?, name = ?, done = ?, date = ? WHERE id = ?",
                [
                    updates.goal_id,
                    updates.name,
                    Number(updates.done),
                    updates.date,
                    id
                ]
            ))
            .then(() => db.get("SELECT * FROM Milestones WHERE id = ?", [id]));
    },
    delete: function(id) {
        let cat;
        return db.open('./log.sqlite')
            .then(() => this.get(id))
            .then(category => {
                cat = category;
                return db.run("DELETE FROM Milestones WHERE id = ?", [id]);
            })
            .then(() => Promise.resolve(cat));
    }
};