//// [tests/cases/compiler/null.ts] ////

//// [null.ts]
var x=null; 
var y=3+x;  
var z=3+null; 
class C {
}
function f() {
    return null;
    return new C();
}
function g() {
    return null;
    return 3;
}
interface I {
    x:any;
    y:number;
}
var w:I={x:null,y:3};




//// [null.js]
var x = null;
var y = 3 + x;
var z = 3 + null;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
function f() {
    return null;
    return new C();
}
function g() {
    return null;
    return 3;
}
var w = { x: null, y: 3 };
