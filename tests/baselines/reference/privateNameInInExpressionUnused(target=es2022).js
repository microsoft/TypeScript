//// [tests/cases/conformance/classes/members/privateNames/privateNameInInExpressionUnused.ts] ////

//// [privateNameInInExpressionUnused.ts]
class Foo {
    #unused: undefined; // expect unused error
    #brand: undefined; // expect no error

    isFoo(v: any): v is Foo {
        // This should count as using/reading '#brand'
        return #brand in v;
    }
}


//// [privateNameInInExpressionUnused.js]
"use strict";
class Foo {
    #unused; // expect unused error
    #brand; // expect no error
    isFoo(v) {
        // This should count as using/reading '#brand'
        return #brand in v;
    }
}
