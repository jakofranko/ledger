const assert = require('assert');
const Category = require('../../models/category');
const CATEGORY_NAME = 'TestCategoryForUnitTests';
const UPDATED_CATEGORY_NAME = 'NEWCATEGORYNAME';
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
        function deleteCategories(queue) {
            return new Promise((resolve, reject) => {
                let currentCategory;
                if (queue && queue.length) {
                    currentCategory = queue.pop();
                    cat.delete(currentCategory.id)
                    .then(() => resolve(deleteCategories(queue)))
                    .catch(err => reject(err));
                } else {
                    resolve();
                }
            });
        }

        cat.getAll()
            .then(categories => {
                let deleteQueue = categories.filter(category => category.name === CATEGORY_NAME || category.name === UPDATED_CATEGORY_NAME);
                assert(deleteQueue.length);
                return deleteCategories(deleteQueue);
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

    it('should update a single category', function(done) {
        const cat = new Category();
        cat.update(TEST_CATEGORY.id, {
            name: UPDATED_CATEGORY_NAME
        })
        .then(category => {
            cat.get(TEST_CATEGORY.id)
            .then(c => {
                assert(c.name === UPDATED_CATEGORY_NAME);
            })
            .catch(err => {
                assert.fail(err)
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
        cat.get(TEST_CATEGORY.id)
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
