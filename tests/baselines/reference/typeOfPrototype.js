//// [typeOfPrototype.ts]
class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK


//// [typeOfPrototype.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.bar = 3;
    }
    Foo.bar = '';
    return Foo;
}());
Foo.prototype.bar = undefined; // Should be OK
