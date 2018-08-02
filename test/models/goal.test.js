const assert = require('assert');
const Goal = require('../../models/goal');
const GOAL_NAME = 'TestGoalForUnitTests';
let TEST_GOAL;

describe('Goal model', function() {
    beforeEach('insert a test goal', function(done) {
        const g = Goal;
        g.create({
            name: GOAL_NAME,
            unit: 'test goal',
            amount: 1,
            interval_id: 0,
            category_id: 0

        }).then(goal => {
                TEST_GOAL = goal;
                assert(goal);
                done();
            })
            .catch(err => {
                assert.fail(err);
                done();
            });
    });

    afterEach('remove test goals from DB', function(done) {
        let g = Goal;
        g.getAll()
            .then(goals => {
                let deletePromises = [];
                goals.filter(goal => goal.name === GOAL_NAME).forEach(goal => {
                    deletePromises.push(g.delete(goal.id));
                });

                Promise.all(deletePromises)
                    .then(function(deleteResults) {
                        assert(deleteResults.length);
                        done();
                    })
                    .catch(err => {
                        assert.fail(err);
                        done();
                    });
            })
            .catch(err => {
                assert.fail(err);
                done();
            });
    });

    it('should fetch all the goals', function(done) {
        const g = Goal;
        g.getAll()
            .then(goals => {
                assert(goals.length);
                goals.forEach(goal => {
                    assert(goal.name);
                });
                done();
            })
            .catch(err => {
                assert.fail(err);
                done();
            });

    });

    it('should get a single goal', function(done) {
        const g = Goal;
        g.get(0)
            .then(goal => {
                assert(goal[0].name);
                done();
            })
            .catch(err => {
                assert.fail(err);
                done();
            });
    });
});
