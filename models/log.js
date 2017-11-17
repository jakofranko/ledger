var Promise = require('bluebird');
const db = require('sqlite');


module.exports = {
    create: function(props) {
        return db.open('./log.sqlite')
            .then(() => db.run(
                "INSERT INTO Logs (description, goal_id, amount, date, duration) VALUES (?, ?, ?, ?, ?)",
                [
                    props.description,
                    props.goal_id,
                    props.amount,
                    props.date,
                    props.duration
                ]
            ))
            .then(stmt => db.get("SELECT * FROM Logs WHERE id = ?", [stmt.lastID]))
    },
    get: function(id) {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Logs WHERE id = ?', [id]));
    },
    getAll: function() {
        return db.open('./log.sqlite').then(() => db.all('SELECT * FROM Logs'));
    },
    update: function(id, updates) {
        return db.open('./log.sqlite')
            .then(() => db.run("UPDATE Logs SET description = ?, goal_id = ?, amount = ?, date = ?, duration = ? WHERE id = ?",
                [
                    updates.description,
                    updates.goal_id,
                    updates.amount,
                    updates.date,
                    updates.duration,
                    id
                ]
            ))
            .then(() => db.get("SELECT * FROM Logs WHERE id = ?", [id]));
    },
    delete: function(id) {
        let cat;
        return db.open('./log.sqlite')
            .then(() => this.get(id))
            .then(category => {


                cat = category;
                return db.run("DELETE FROM Logs WHERE id = ?", [id]);
            })
            .then(() => Promise.resolve(cat));
    }
};