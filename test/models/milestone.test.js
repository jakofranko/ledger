const assert = require('assert');
const Promise = require('bluebird');
const Milestone = require('../../models/milestone.js');
const TEST_MILESTONE = {
    name: 'Test Milestone',
    goal_id: 0
};
const UPDATED_MILESTONE = {
    name: "UPDATED TEST MILESTONE",
    done: 1,
    date: "01/01/2001",
    goal_id: 1
};
let TEST_MILESTONE_ID;

describe('Milestone model', function() {
    beforeEach('a test milestone should be created', function(done) {
        const m = new Milestone();
        m.create(TEST_MILESTONE)
        .then(milestone => {
            assert(milestone.name === TEST_MILESTONE.name);
            TEST_MILESTONE_ID = milestone.id;
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        });
    });

    afterEach('all test milestones should be deleted', function(done) {
        const m = new Milestone();
        function deleteMilestones(queue) {
            return new Promise((resolve, reject) => {
                let currentMilestone;
                if (queue && queue.length) {
                    currentMilestone = queue.pop();
                    m.delete(currentMilestone.id)
                    .then(() => resolve(deleteMilestones(queue)))
                    .catch(err => reject(err));
                } else {
                    resolve();
                }
            });
        }

        m.getAll()
        .then(milestones => {
            let testMilestones = milestones.filter(milestone => milestone.name === TEST_MILESTONE.name || milestone.name === UPDATED_MILESTONE.name);
            return deleteMilestones(testMilestones);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        })
    });

    it('should get a single milestone', function(done) {
        const m = new Milestone();
        m.get(TEST_MILESTONE_ID)
        .then(milestone => {
            assert(milestone[0] && milestone[0].name === TEST_MILESTONE.name);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        });
    });

    it('should get all milestones', function(done) {
        const m = new Milestone();
        m.getAll()
        .then(milestones => {
            assert(milestones.length);
            assert(milestones[0].name);
            assert(milestones[0].done !== undefined);
            assert(milestones[0].goal_id !== undefined);
            assert(milestones[0].date !== undefined);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        });
    });

    it('should get all milestones that are done', function(done) {
        const m = new Milestone();
        m.update(TEST_MILESTONE_ID, UPDATED_MILESTONE).then(ms => {
            m.getDone()
            .then(completed => {
                assert(completed.length);
                completed.forEach(c => {
                    assert(c.done === 1);
                });

            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                m.close();
                done();
            });
        });
    });

    it('should get all milestones that are not done', function(done) {
        const m = new Milestone();
        m.getNotDone()
        .then(incomplete => {
            assert(incomplete.length);
            incomplete.forEach(c => {
                assert(c.done === 0);
            });
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        });
    });

    it('should update a single milestone', function(done) {
        const m = new Milestone();
        m.update(TEST_MILESTONE_ID, UPDATED_MILESTONE)
        .then(updatedMilestone => {
            assert(updatedMilestone && updatedMilestone.name === UPDATED_MILESTONE.name);
            assert(updatedMilestone && updatedMilestone.done === UPDATED_MILESTONE.done);
            assert(updatedMilestone && updatedMilestone.date === UPDATED_MILESTONE.date);
            assert(updatedMilestone && updatedMilestone.goal_id === UPDATED_MILESTONE.goal_id);
        })
        .catch(err => {
            assert.fail(err);
        })
        .finally(() => {
            m.close();
            done();
        });
    });
});
