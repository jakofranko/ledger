-- Up
CREATE TABLE Categories (id INTEGER PRIMARY KEY, name VARCHAR);
CREATE TABLE Intervals (id INTEGER PRIMARY KEY, name VARCHAR);
CREATE TABLE Goals (
    id INTEGER PRIMARY KEY, name VARCHAR, unit VARCHAR, amount INTEGER, category_id INTEGER, interval_id INTEGER,
    CONSTRAINT Goals_fk_category_id FOREIGN KEY (category_id) REFERENCES Categories (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Goals_fk_interval_id FOREIGN KEY (interval_id) REFERENCES Intervals (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE Logs (
    id INTEGER PRIMARY KEY, description VARCHAR, goal_id INTEGER, amount INTEGER, date VARCHAR, duration FLOAT,
    CONSTRAINT Logs_fk_goal_id FOREIGN KEY (goal_id) REFERENCES Goals (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE Milestones (
    id INTEGER PRIMARY KEY, goal_id INTEGER, name VARCHAR,
    CONSTRAINT Milestones_fk_goal_id FOREIGN KEY (goal_id) REFERENCES Goals (id) ON UPDATE CASCADE ON DELETE CASCADE
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

INSERT INTO Goals (id, name, unit, amount, category_id, interval_id) VALUES (0, "learn french", "DuoLingo lessons", 3, 0, 0);
INSERT INTO Logs (description, goal_id, amount, date, duration) VALUES ('Did a few lessons', 0, 1, date(), 0.5);

-- Down
DROP TABLE Categories;
DROP TABLE Intervals;
DROP TABLE Goals;
DROP TABLE Logs;
DROP TABLE Milestones;