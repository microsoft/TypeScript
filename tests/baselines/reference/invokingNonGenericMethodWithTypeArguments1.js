//// [tests/cases/compiler/invokingNonGenericMethodWithTypeArguments1.ts] ////

//// [invokingNonGenericMethodWithTypeArguments1.ts]
class Foo {
    constructor() {
        this.foo<string>();
    }
}


//// [invokingNonGenericMethodWithTypeArguments1.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.foo();
    }
    return Foo;
}());
