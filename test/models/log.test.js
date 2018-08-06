const assert = require('assert');
const Promise = require('bluebird');
const Log = require('../../models/log.js');
const TEST_LOG = {
    description: 'this is a test log',
    amount: 9999,
    date: "01/01/2001",
    duration: 9999,
    goal_id: 0
};
const UPDATED_DESCRIPTION = 'this log description has been updated';
let TEST_LOG_ID;

describe('Log model', function() {
    beforeEach('a test log should be created', function(done) {
        const l = new Log();
        l.create(TEST_LOG)
        .then(log => {
            assert(log.description === TEST_LOG.description);
            TEST_LOG_ID = log.id;
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            l.close();
            done();
        });
    });

    afterEach('all test logs should be deleted', function(done) {
        const l = new Log();
        function deleteLogs(queue) {
            return new Promise((resolve, reject) => {
                let currentLog;
                if (queue && queue.length) {
                    currentLog = queue.pop();
                    l.delete(currentLog.id)
                    .then(() => resolve(deleteLogs(queue)))
                    .catch(err => reject(err));
                } else {
                    resolve();
                }
            });
        }

        l.getAll()
        .then(logs => {
            let testLogs = logs.filter(log => log.description === TEST_LOG.description || log.description === UPDATED_DESCRIPTION);
            return deleteLogs(testLogs);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            l.close();
            done();
        })
    });

    it('should get a single log', function(done) {
        const l = new Log();
        l.get(TEST_LOG_ID)
        .then(log => {
            assert(log[0] && log[0].description === TEST_LOG.description);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            l.close();
            done();
        });
    });

    it('should get all logs', function(done) {
        const l = new Log();
        l.getAll()
        .then(logs => {
            assert(logs.length);
            assert(logs[0].description);
            assert(logs[0].amount !== undefined);
            assert(logs[0].goal_id !== undefined);
            assert(logs[0].duration !== undefined);
            assert(logs[0].date);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            l.close();
            done();
        });
    });

    it('should update a single log', function(done) {
        const l = new Log();
        l.update(TEST_LOG_ID, Object.assign(TEST_LOG, { description: UPDATED_DESCRIPTION }))
        .then(updatedLog => {
            assert(updatedLog && updatedLog.description === UPDATED_DESCRIPTION);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            l.close();
            done();
        });
    });
});
