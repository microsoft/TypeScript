//// [implicitAnyDeclareFunctionExprWithoutFormalType.ts]
// these should be errors for implicit any parameter
var lambda = (l1) => { };       // Error at "l1"
var lambd2 = (ll1, ll2: string) => { }  // Error at "ll1"
var lamda3 = function myLambda3(myParam) { }
var lamda4 = () => { return null };

// these should be error for implicit any return type
var lambda5 = function temp() { return null; }
var lambda6 = () => { return null; }
var lambda7 = function temp() { return undefined; }
var lambda8 = () => { return undefined; }

// this shouldn't be an error
var lambda9 = () => { return 5; }
var lambda10 = function temp1() { return 5; }



//// [implicitAnyDeclareFunctionExprWithoutFormalType.js]
// these should be errors for implicit any parameter
var lambda = function (l1) { }; // Error at "l1"
var lambd2 = function (ll1, ll2) { }; // Error at "ll1"
var lamda3 = function myLambda3(myParam) { };
var lamda4 = function () { return null; };
// these should be error for implicit any return type
var lambda5 = function temp() { return null; };
var lambda6 = function () { return null; };
var lambda7 = function temp() { return undefined; };
var lambda8 = function () { return undefined; };
// this shouldn't be an error
var lambda9 = function () { return 5; };
var lambda10 = function temp1() { return 5; };
