//// [tests/cases/compiler/strictModeUseContextualKeyword.ts] ////

//// [strictModeUseContextualKeyword.ts]
"use strict"
var as = 0;
function foo(as: string) { }
class C {
    public as() { }
}
function F() {
    function as() { }
}
function H() {
    let {as} = { as: 1 };
}


//// [strictModeUseContextualKeyword.js]
"use strict";
var as = 0;
function foo(as) { }
class C {
    as() { }
}
function F() {
    function as() { }
}
function H() {
    let { as } = { as: 1 };
}
