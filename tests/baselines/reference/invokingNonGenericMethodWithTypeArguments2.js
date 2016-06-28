//// [invokingNonGenericMethodWithTypeArguments2.ts]
class Foo {
    private foo: any;

    constructor() {
        this.foo<string>();
    }
}


//// [invokingNonGenericMethodWithTypeArguments2.js]
var Foo = (function () {
    function Foo() {
        this.foo();
    }
    return Foo;
}());
