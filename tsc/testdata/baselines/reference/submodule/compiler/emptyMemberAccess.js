//// [tests/cases/compiler/emptyMemberAccess.ts] ////

//// [emptyMemberAccess.ts]
function getObj() {

   ().toString();

}
 

//// [emptyMemberAccess.js]
function getObj() {
    ().toString();
}
