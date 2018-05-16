console.log('foo line 1');
var bar = require('./wunder/bar');

module.exports = function foo() {
  console.log('hello from foo line 5');
  bar();
};
