//// [tests/cases/compiler/emptyMemberAccess.ts] ////

//// [emptyMemberAccess.ts]
function getObj() {

   ().toString();

}
 

//// [emptyMemberAccess.js]
"use strict";
function getObj() {
    ().toString();
}
