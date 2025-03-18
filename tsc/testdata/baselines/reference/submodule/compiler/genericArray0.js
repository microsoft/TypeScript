//// [tests/cases/compiler/genericArray0.ts] ////

//// [genericArray0.ts]
var x:number[];


var y = x; 

function map<U>() {
    var ys: U[] = [];
}


//// [genericArray0.js]
var x;
var y = x;
function map() {
    var ys = [];
}
