//// [tests/cases/compiler/genericArrayAssignmentCompatErrors.ts] ////

//// [genericArrayAssignmentCompatErrors.ts]
var myCars=new Array(); 
var myCars2 = new [];
var myCars3 = new Array({});
declare var myCars4: Array; // error
declare var myCars5: Array<any>[];
 
myCars = myCars2;
myCars = myCars3;
myCars = myCars4;
myCars = myCars5;
 
myCars2 = myCars;
myCars2 = myCars3;
myCars2 = myCars4;
myCars2 = myCars5;
 
myCars3 = myCars;
myCars3 = myCars2;
myCars3 = myCars4;
myCars3 = myCars5;   


//// [genericArrayAssignmentCompatErrors.js]
var myCars = new Array();
var myCars2 = new [];
var myCars3 = new Array({});
myCars = myCars2;
myCars = myCars3;
myCars = myCars4;
myCars = myCars5;
myCars2 = myCars;
myCars2 = myCars3;
myCars2 = myCars4;
myCars2 = myCars5;
myCars3 = myCars;
myCars3 = myCars2;
myCars3 = myCars4;
myCars3 = myCars5;
