//// [tests/cases/compiler/contextualTyping14.ts] ////

//// [contextualTyping14.ts]
class foo { public bar:(a:number)=>number = function(a){return a}; }

//// [contextualTyping14.js]
"use strict";
class foo {
    constructor() {
        this.bar = function (a) { return a; };
    }
}
