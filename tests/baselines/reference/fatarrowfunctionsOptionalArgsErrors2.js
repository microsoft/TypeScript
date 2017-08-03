//// [fatarrowfunctionsOptionalArgsErrors2.ts]
var tt1 = (a, (b, c)) => a+b+c;
var tt2 = ((a), b, c) => a+b+c;

var tt3 = ((a)) => a;

//// [fatarrowfunctionsOptionalArgsErrors2.js]
var tt1 = function (a, ) {
    if ( === void 0) {  = (b, c); }
    return a + b + c;
};
var tt2 = ((a), b, c);
a + b + c;
var tt3 = ((a));
a;
