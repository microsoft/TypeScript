times++;
t.equal(times, 4);

var b = require('./lib/b');
b.foo();

t.equal(times, 5);
