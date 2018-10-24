//// [assigningIncompatibleConstructor.ts]
class Foo { constructor(a: string) { } }
let FooConstructor: { new(): Foo } = Foo;
 //// [assigningIncompatibleConstructor.js]
var Foo = /** @class */ (function () {
    function Foo(a) {
    }
    return Foo;
}());
var FooConstructor = Foo;
