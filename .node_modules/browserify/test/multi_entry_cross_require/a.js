times ++;
t.equal(times, 1);

var b = require('./lib/b');
t.equal(times, 2);

b.foo();
t.equal(times, 3);
