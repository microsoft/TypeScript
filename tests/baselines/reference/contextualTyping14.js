//// [tests/cases/compiler/contextualTyping14.ts] ////

//// [contextualTyping14.ts]
class foo { public bar:(a:number)=>number = function(a){return a}; }

//// [contextualTyping14.js]
"use strict";
var foo = /** @class */ (function () {
    function foo() {
        this.bar = function (a) { return a; };
    }
    return foo;
}());
