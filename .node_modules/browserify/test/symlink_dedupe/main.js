var A = require('./one/f.js');
var B = require('./one/dir/f.js');
t.equal(A, B);
t.equal(A(), 555);
t.equal(B(), 555);

