# Ledger

A place for scrivening goals and logs. A simple, RESTful server that exposes an API for [Scriven](https://github.com/jakofranko/scriven). Built using Node.js, Express, and SQLite.

## Installation

In `app.js`, uncomment the line that has `db.migrate({force: 'last'})`. This will set up your SQLite DB.

_*Make sure you comment this line again, or else your data will be wiped after you restart the app*_

Then:

```
npm install
npm start
```

This starts an instance of Ledger running on `localhost:3000`, and is available for an instance of Scriven.

## TODO

* Clean out unused libs and routes
* Add additional fields to Logs with descriptions and durations, and make sure that the goal_id is optional
* Goal-related milestones
* Security layer for user authentication and access
