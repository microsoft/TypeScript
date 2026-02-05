//// [tests/cases/compiler/unusedParameterInCatchClause.ts] ////

//// [unusedParameterInCatchClause.ts]
function f1() {
    try {} catch(ex){}
}

//// [unusedParameterInCatchClause.js]
"use strict";
function f1() {
    try { }
    catch (ex) { }
}
