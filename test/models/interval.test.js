const assert = require('assert');
const Interval = require('../../models/interval');
const INTERVAL_NAME = 'TestIntervalForUnitTests';
const UPDATED_INTERVAL_NAME = 'NEWINTERVALNAME';
let TEST_INTERVAL;

describe('Interval model', function() {
    it('should fetch all the intervals', function(done) {
        const i = new Interval();
        i.getAll()
        .then(intervals => {
            assert(intervals.length);
            intervals.forEach(interval => {
                assert(interval.name);
            });
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            i.close();
            done();
        });
    });
});
