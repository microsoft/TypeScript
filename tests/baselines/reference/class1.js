//// [class1.ts]
interface foo{ }
class foo{ }

//// [class1.js]
var foo = (function () {
    function foo() {
    }
    return foo;
})();
