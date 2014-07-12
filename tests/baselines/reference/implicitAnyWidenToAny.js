//// [implicitAnyWidenToAny.js]
// these should be errors
var x = null;
var x1 = undefined;
var widenArray = [null, undefined];
var emptyArray = [];

// these should not be error
var AnimalObj = (function () {
    function AnimalObj() {
    }
    return AnimalObj;
})();
var foo = 5;
var bar = "Hello World";
var foo1 = null;
var foo2 = undefined;
var temp = 5;
var c = { x: null };
var array1 = ["Bob", 2];
var array2 = [];
var array3 = [null, undefined];
var array4 = [null, undefined];
var array5 = [null, undefined];

var objLit;
function anyReturnFunc() {
}
var obj0 = new objLit(1);
var obj1 = anyReturnFunc();
