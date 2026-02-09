//// [tests/cases/compiler/invokingNonGenericMethodWithTypeArguments1.ts] ////

//// [invokingNonGenericMethodWithTypeArguments1.ts]
class Foo {
    constructor() {
        this.foo<string>();
    }
}


//// [invokingNonGenericMethodWithTypeArguments1.js]
"use strict";
class Foo {
    constructor() {
        this.foo();
    }
}
