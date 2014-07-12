//// [voidArrayLit.js]
var va = [(function () {
    })()];
(function () {
})(); // ok
function foo(s) {
}
foo((function () {
})()); // error
