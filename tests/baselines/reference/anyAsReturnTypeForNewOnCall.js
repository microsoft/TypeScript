//// [tests/cases/compiler/anyAsReturnTypeForNewOnCall.ts] ////

//// [anyAsReturnTypeForNewOnCall.ts]
function Point(x, y) {

 this.x = x;

 this.y = y;

}

var o = new Point(3, 4);

var xx = o.x;

 


//// [anyAsReturnTypeForNewOnCall.js]
function Point(x, y) {
    this.x = x;
    this.y = y;
}
var o = new Point(3, 4);
var xx = o.x;
