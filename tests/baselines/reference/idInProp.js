//// [tests/cases/compiler/idInProp.ts] ////

//// [idInProp.ts]
function f() {

var t: { (f: any) : any; };

}


//// [idInProp.js]
"use strict";
function f() {
    var t;
}
