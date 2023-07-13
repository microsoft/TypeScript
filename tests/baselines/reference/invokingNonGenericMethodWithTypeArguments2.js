//// [tests/cases/compiler/invokingNonGenericMethodWithTypeArguments2.ts] ////

//// [invokingNonGenericMethodWithTypeArguments2.ts]
class Foo {
    private foo: any;

    constructor() {
        this.foo<string>();
    }
}


//// [invokingNonGenericMethodWithTypeArguments2.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.foo();
    }
    return Foo;
}());
