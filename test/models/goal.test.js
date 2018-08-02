const assert = require('assert');
const Goal = require('../../models/goal');
const GOAL_NAME = 'TestGoalForUnitTests';
const UPDATED_GOAL_NAME = 'NEW GOAL NAME';
let TEST_GOAL;

describe('Goal model', function() {
    beforeEach('insert a test goal', function(done) {
        const g = new Goal();
        g.create({
            name: GOAL_NAME,
            unit: 'test goal',
            amount: 1,
            interval_id: 0,
            category_id: 0

        }).then(goal => {
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
        let g = new Goal();
        function deleteGoals(queue) {
            return new Promise((resolve, reject) => {
                let currentGoal;
                if (queue && queue.length) {
                    currentGoal = queue.pop();
                    g.delete(currentGoal.id)
                    .then(() => resolve(deleteGoals(queue)))
                    .catch(err => reject(err));
                } else {
                    resolve();
                }
            });
        }

        g.getAll()
            .then(goals => {
                let deleteQueue = goals.filter(goal => goal.name === GOAL_NAME || goal.name === UPDATED_GOAL_NAME);
                assert(deleteQueue.length);
                return deleteGoals(deleteQueue);
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
        const g = new Goal();
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

    it('should update a single goal', function(done) {
        const g = new Goal();
        g.update(TEST_GOAL.id, {
            name: UPDATED_GOAL_NAME,
            unit: 'NEW UNIT',
            amount: 9999,
            category_id: 0,
            interval_id: 0
        })
        .then(goal => {
            g.get(TEST_GOAL.id)
            .then(newGoal => {
                assert(newGoal.name === UPDATED_GOAL_NAME);
                assert(newGoal.unit === 'NEW UNIT');
                assert(newGoal.amount === 9999);
            })
            .catch(err => {
                assert.fail(err);
            })
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            g.close();
            done();
        })
    });

    it('should get a single goal', function(done) {
        const g = new Goal();
        g.get(TEST_GOAL.id)
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
