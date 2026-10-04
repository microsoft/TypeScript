//// [tests/cases/compiler/declarationEmitConstructorType.ts] ////

//// [declarationEmitConstructorType.ts]
declare namespace NS {
    interface Foo { }
    var Foo: new () => number;
}


//// [declarationEmitConstructorType.js]
"use strict";


//// [declarationEmitConstructorType.d.ts]
declare namespace NS {
    interface Foo {
    }
    var Foo: new () => number;
}
