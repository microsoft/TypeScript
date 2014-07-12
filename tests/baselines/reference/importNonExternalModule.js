//// [foo_0.js]
var foo;
(function (foo) {
    foo.answer = 42;
})(foo || (foo = {}));
//// [foo_1.js]
define(["require", "exports", "./foo_0"], function(require, exports, foo) {
    // Import should fail.  foo_0 not an external module
    if (foo.answer === 42) {
    }
});
