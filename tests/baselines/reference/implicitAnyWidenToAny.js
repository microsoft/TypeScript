//// [tests/cases/compiler/implicitAnyWidenToAny.ts] ////

//// [implicitAnyWidenToAny.ts]
// these should be errors
var x = null;                        // error at "x"
var x1 = undefined;		             // error at "x1"
var widenArray = [null, undefined];  // error at "widenArray"
var emptyArray = [];

// these should not be error
class AnimalObj {
      x:any;
}
var foo = 5;
var bar = "Hello World";
var foo1: any = null;
var foo2: any = undefined;
var temp: number = 5;
var c: AnimalObj = { x: null }; 
var array1 = ["Bob",2];
var array2: any[] = [];
var array3: any[] = [null, undefined];
var array4: number[] = [null, undefined];
var array5 = <any[]>[null, undefined];

var objLit: { new (n: number): any; };
function anyReturnFunc(): any { }
var obj0 = new objLit(1);
var obj1 = anyReturnFunc();


//// [implicitAnyWidenToAny.js]
// these should be errors
var x = null; // error at "x"
var x1 = undefined; // error at "x1"
var widenArray = [null, undefined]; // error at "widenArray"
var emptyArray = [];
// these should not be error
var AnimalObj = /** @class */ (function () {
    function AnimalObj() {
    }
    return AnimalObj;
}());
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
function anyReturnFunc() { }
var obj0 = new objLit(1);
var obj1 = anyReturnFunc();
