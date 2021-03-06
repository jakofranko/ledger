var Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

const Categories = function() {
    this.db = new sqlite3.Database('./log.sqlite', (err) => {
        if (err) console.error(err);
    });

    this.close = function() {
        this.db.close();
    }
}

Categories.prototype.create = function(props) {
    return new Promise((resolve, reject) => {
        const db = this.db;
        db.run("INSERT INTO Categories (name) VALUES (?)", props.name, function(err) {
            if (err) {
                console.error("Error while inserting category ''" + props.name + "' into SQLite.")
                reject(err);
            }

            db.get("SELECT * FROM Categories WHERE id = ?", this.lastID, function(err, row) {
                if (err) {
                    console.error("Error while fetching new category ''" + props.name + "' after inserting into SQLite.")
                    reject(err);
                }

                resolve(row);
            });
        });
    });
},
Categories.prototype.get = function(id) {
    return new Promise((resolve, reject) => {
        this.db.get('SELECT * FROM Categories WHERE id = ?', id, function(err, r) {
            if (err) {
                console.error("Error fetching categories with id '" + id + "'");
                reject(err);
            }

            resolve(r);
        });
    });
},
Categories.prototype.getAll = function() {
    return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM Categories', function(err, r) {
            if (err) {
                console.error("Error fetching all categories");
                reject(err);
            }

            resolve(r);
        });
    });
},
Categories.prototype.update = function(id, updates) {
    return new Promise((resolve, reject) => {
        this.db.run("UPDATE Categories SET name = ? WHERE id = ?", [updates.name, id], function(err){
            if (err) {
                console.error("Problem updating row '" + id + "' to name '" + updates.name + "'");
                reject(err);
            }
        });
        this.db.get("SELECT * FROM Categories WHERE id = ?", id, function(err, row) {
            if (err) {
                console.error("Problem fetching updated row.");
                reject(err);
            }

            resolve(row);
        });
    });
},
Categories.prototype.delete = function(id) {
    return new Promise((resolve, reject) => {
        let category = this.get(id);
        this.db.run("DELETE FROM Categories WHERE id = ?", id, function(err) {
            if (err) {
                console.log("Problem deleting row '" + id + "'");
                reject(err);
            }

            resolve(category);
        });
    });
}

module.exports = Categories;
