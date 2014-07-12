//// [arrayLiteralAndArrayConstructorEquivalence1.js]
var myCars = new Array();
var myCars3 = new Array({});
var myCars4;
var myCars5;

myCars = myCars3;
myCars = myCars4;
myCars = myCars5;

myCars3 = myCars;
myCars3 = myCars4;
myCars3 = myCars5;
