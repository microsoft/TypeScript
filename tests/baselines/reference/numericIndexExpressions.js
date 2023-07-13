//// [tests/cases/compiler/numericIndexExpressions.ts] ////

//// [numericIndexExpressions.ts]
interface Numbers1 {
    1: string;
}
interface Strings1 {
    '1': string;
}
 
 
var x: Numbers1;
x[1] = 4; // error
x['1'] = 4; // error

var y: Strings1;
y['1'] = 4; // should be error
y[1] = 4; // should be error

//// [numericIndexExpressions.js]
var x;
x[1] = 4; // error
x['1'] = 4; // error
var y;
y['1'] = 4; // should be error
y[1] = 4; // should be error
