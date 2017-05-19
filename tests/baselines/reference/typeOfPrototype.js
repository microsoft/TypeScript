//// [typeOfPrototype.ts]
class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK


//// [typeOfPrototype.js]
var Foo = (function () {
    function Foo() {
        this.bar = 3;
    }
    return Foo;
}());
Foo.bar = '';
Foo.prototype.bar = undefined; // Should be OK
