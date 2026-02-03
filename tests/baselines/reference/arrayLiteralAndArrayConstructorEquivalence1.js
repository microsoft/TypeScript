//// [tests/cases/compiler/arrayLiteralAndArrayConstructorEquivalence1.ts] ////

//// [arrayLiteralAndArrayConstructorEquivalence1.ts]
var myCars=new Array(); 
var myCars3 = new Array({});
declare var myCars4: Array; // error
declare var myCars5: Array<any>[];
 
myCars = myCars3;
myCars = myCars4;
myCars = myCars5;
 
myCars3 = myCars;
myCars3 = myCars4;
myCars3 = myCars5;   


//// [arrayLiteralAndArrayConstructorEquivalence1.js]
var myCars = new Array();
var myCars3 = new Array({});
myCars = myCars3;
myCars = myCars4;
myCars = myCars5;
myCars3 = myCars;
myCars3 = myCars4;
myCars3 = myCars5;
