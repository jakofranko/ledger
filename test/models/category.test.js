const assert = require('assert');
const Category = require('../../models/category');
const CATEGORY_NAME = 'TestCategoryForUnitTests';
let TEST_CATEGORY;

describe('Category model', function() {
    beforeEach('insert a test category', function(done) {
        const cat = new Category();
        cat.create({ name: CATEGORY_NAME })
            .then(category => {
                TEST_CATEGORY = category;
                assert(category);
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                cat.close();
                done();
            });
    });

    afterEach('remove test categories from DB', function(done) {
        let cat = new Category();
        cat.getAll()
            .then(categories => {
                let deletePromises = [];
                categories.filter(category => category.name === CATEGORY_NAME).forEach(category => {
                    deletePromises.push(cat.delete(category.id));
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
                cat.close();
                done();
            });
    });

    it('should fetch all the categories', function(done) {
        const cat = new Category();
        cat.getAll()
            .then(categories => {
                assert(categories.length);
                categories.forEach(category => {
                    assert(category.name);
                });
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                cat.close();
                done();
            });

    });

    it('should get a single cateogry', function(done) {
        const cat = new Category();
        cat.get(0)
            .then(category => {
                assert(category.name);
            })
            .catch(err => {
                assert.fail(err);
            })
            .finally(() => {
                cat.close();
                done();
            });
    });
});
