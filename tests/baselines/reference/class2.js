//// [class2.ts]
class foo { constructor() { static f = 3; } }

//// [class2.js]
var foo = (function () {
    function foo() {
    }
    foo.f = 3;
    return foo;
}());
