t.deepEqual(require('./skip.js'), {});
t.deepEqual(require('./double-skip/index'), {foo: 'bar'});