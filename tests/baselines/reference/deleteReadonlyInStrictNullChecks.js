//// [tests/cases/compiler/deleteReadonlyInStrictNullChecks.ts] ////

//// [deleteReadonlyInStrictNullChecks.ts]
interface Function { readonly name: string; }
class Foo {}
delete Foo.name;


//// [deleteReadonlyInStrictNullChecks.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
delete Foo.name;
