//// [class1.ts]
interface foo{ } // error
class foo{ } // error

//// [class1.js]
var foo = (function () {
    function foo() {
    }
    return foo;
})(); // error
