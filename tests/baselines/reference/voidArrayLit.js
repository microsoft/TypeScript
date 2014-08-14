//// [voidArrayLit.ts]
var va = [(() => {})()]; // ok
(() => {})(); // ok
function foo(s:string) {}
foo((()=>{})()); // error


//// [voidArrayLit.js]
var va = [(function () {
})()];// ok 
(function () {
})();
function foo(s) {
}
foo((function () {
})());
