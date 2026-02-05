//// [tests/cases/compiler/errorOnInitializerInObjectTypeLiteralProperty.ts] ////

//// [errorOnInitializerInObjectTypeLiteralProperty.ts]
var Foo: {
    bar: number = 5;
};

let Bar: {
    bar: number = 5;
};


//// [errorOnInitializerInObjectTypeLiteralProperty.js]
"use strict";
var Foo;
let Bar;
