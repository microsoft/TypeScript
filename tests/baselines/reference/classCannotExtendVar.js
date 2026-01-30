//// [tests/cases/compiler/classCannotExtendVar.ts] ////

//// [classCannotExtendVar.ts]
var Markup;

class Markup {
    constructor() {
    }
}


//// [classCannotExtendVar.js]
"use strict";
var Markup;
var Markup = /** @class */ (function () {
    function Markup() {
    }
    return Markup;
}());
