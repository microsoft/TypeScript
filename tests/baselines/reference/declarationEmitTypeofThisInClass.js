//// [tests/cases/compiler/declarationEmitTypeofThisInClass.ts] ////

//// [declarationEmitTypeofThisInClass.ts]
class Foo {
    public foo!: string
    public bar!: typeof this.foo //Public property 'bar' of exported class has or is using private name 'this'.(4031)
}

//// [declarationEmitTypeofThisInClass.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());


//// [declarationEmitTypeofThisInClass.d.ts]
declare class Foo {
    foo: string;
    bar: typeof this.foo;
}
