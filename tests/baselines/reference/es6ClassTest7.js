//// [tests/cases/compiler/es6ClassTest7.ts] ////

//// [es6ClassTest7.ts]
declare namespace M {
    export class Foo {
    }
}

class Bar extends M.Foo {
}


//// [es6ClassTest7.js]
"use strict";
class Bar extends M.Foo {
}
