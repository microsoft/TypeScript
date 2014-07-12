//// [concatClassAndString.ts]
// Shouldn't compile (the long form f = f + ""; doesn't):
class f { }

f += '';


//// [concatClassAndString.js]
var f = (function () {
    function f() {
    }
    return f;
})();
f += '';
