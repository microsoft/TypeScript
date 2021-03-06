//// [class2.ts]
class foo { constructor() { static f = 3; } }

//// [class2.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    (function () {
        foo.f = 3;
    }).call(foo);
    return foo;
}());
