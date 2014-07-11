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


//// [genericArray0.d.ts]
declare var x;
declare var y;
declare function map<U>();
