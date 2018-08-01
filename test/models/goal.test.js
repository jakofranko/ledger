const assert = require('assert');
const Goal = require('../../models/goal');
const GOAL_NAME = 'TestGoalForUnitTests';
let TEST_GOAL;

describe('Goal model', function() {
    beforeEach('insert a test goal', function(done) {
        const g = Goal;
        g.create({ name: GOAL_NAME })
            .then(goal => {
                TEST_GOAL = goal;
                assert(goal);
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                g.close();
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
                    })
                    .catch(err => {
                        assert.fail(err);
                    });
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                g.close();
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
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                g.close();
                done();
            });

    });

    it('should get a single cateogry', function(done) {
        const g = Goal;
        g.get(0)
            .then(goal => {
                assert(goal.name);
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                g.close();
                done();
            });
    });
});
