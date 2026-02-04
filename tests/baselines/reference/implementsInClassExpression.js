//// [tests/cases/compiler/implementsInClassExpression.ts] ////

//// [implementsInClassExpression.ts]
interface Foo {
    doThing(): void;
}

let cls = class implements Foo {
    doThing() { }
}

//// [implementsInClassExpression.js]
"use strict";
let cls = class {
    doThing() { }
};
