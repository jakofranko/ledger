-- Up
CREATE TABLE Categories (id INTEGER PRIMARY KEY, name VARCHAR);
CREATE TABLE Intervals (id INTEGER PRIMARY KEY, name VARCHAR);
CREATE TABLE Goals (
    id INTEGER PRIMARY KEY, name VARCHAR, unit VARCHAR, amount INTEGER, category_id INTEGER, interval_id INTEGER,
    CONSTRAINT Goals_fk_category_id FOREIGN KEY (category_id) REFERENCES Categories (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Goals_fk_interval_id FOREIGN KEY (interval_id) REFERENCES Intervals (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE Logs (
    id INTEGER PRIMARY KEY, goal_id INTEGER, amount INTEGER, datetime TEXT,
    CONSTRAINT Logs_fk_goal_id FOREIGN KEY (goal_id) REFERENCES Goals (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Categories (id, name) VALUES (0, 'linguistics');
INSERT INTO Categories (id, name) VALUES (1, 'family');
INSERT INTO Categories (id, name) VALUES (2, 'home');
INSERT INTO Categories (id, name) VALUES (3, 'intake');
INSERT INTO Categories (id, name) VALUES (4, 'projects');

INSERT INTO Intervals (id, name) VALUES (0, 'day');
INSERT INTO Intervals (id, name) VALUES (1, 'week');
INSERT INTO Intervals (id, name) VALUES (2, 'month');
INSERT INTO Intervals (id, name) VALUES (3, 'year');

INSERT INTO Goals (name, unit, amount, category_id, interval_id) VALUES ("learn french", "DuoLingo lessons", 3, 0, 0);
INSERT INTO Logs (goal_id, amount, datetime) VALUES (0, 1, datetime());

-- Down
DROP TABLE Categories;
DROP TABLE Intervals;
DROP TABLE Goals;
DROP TABLE Logs;