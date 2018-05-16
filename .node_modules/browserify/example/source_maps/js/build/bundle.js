;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){
console.log('main line 1');
var foo = require('./foo.js');

foo();

},{"./foo.js":2}],2:[function(require,module,exports){
console.log('foo line 1');
var bar = require('./wunder/bar');

module.exports = function foo() {
  console.log('hello from foo line 5');
  bar();
};

},{"./wunder/bar":3}],3:[function(require,module,exports){
console.log('bar line 1');
'use strict';

// this is a meaningless comment to add some lines

module.exports = function bar() {
  console.log('hello from bar line 7');
};

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyIvVXNlcnMvdGhsb3JlbnovZGV2L2pzL3Byb2plY3RzL2ZvcmtzL25vZGUtYnJvd3NlcmlmeS9leGFtcGxlL3NvdXJjZV9tYXBzL2pzL21haW4uanMiLCIvVXNlcnMvdGhsb3JlbnovZGV2L2pzL3Byb2plY3RzL2ZvcmtzL25vZGUtYnJvd3NlcmlmeS9leGFtcGxlL3NvdXJjZV9tYXBzL2pzL2Zvby5qcyIsIi9Vc2Vycy90aGxvcmVuei9kZXYvanMvcHJvamVjdHMvZm9ya3Mvbm9kZS1icm93c2VyaWZ5L2V4YW1wbGUvc291cmNlX21hcHMvanMvd3VuZGVyL2Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiJmaWxlOi8vbG9jYWxob3N0Iiwic291cmNlQ29udGVudCI6WyJjb25zb2xlLmxvZygnbWFpbiBsaW5lIDEnKTtcbnZhciBmb28gPSByZXF1aXJlKCcuL2Zvby5qcycpO1xuXG5mb28oKTtcbiIsImNvbnNvbGUubG9nKCdmb28gbGluZSAxJyk7XG52YXIgYmFyID0gcmVxdWlyZSgnLi93dW5kZXIvYmFyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9vKCkge1xuICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBmb28gbGluZSA1Jyk7XG4gIGJhcigpO1xufTtcbiIsImNvbnNvbGUubG9nKCdiYXIgbGluZSAxJyk7XG4ndXNlIHN0cmljdCc7XG5cbi8vIHRoaXMgaXMgYSBtZWFuaW5nbGVzcyBjb21tZW50IHRvIGFkZCBzb21lIGxpbmVzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmFyKCkge1xuICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBiYXIgbGluZSA3Jyk7XG59O1xuIl19
;