//// [tests/cases/compiler/numericIndexExpressions.ts] ////

//// [numericIndexExpressions.ts]
interface Numbers1 {
    1: string;
}
interface Strings1 {
    '1': string;
}
 
 
declare var x: Numbers1;
x[1] = 4; // error
x['1'] = 4; // error

declare var y: Strings1;
y['1'] = 4; // should be error
y[1] = 4; // should be error

//// [numericIndexExpressions.js]
x[1] = 4; // error
x['1'] = 4; // error
y['1'] = 4; // should be error
y[1] = 4; // should be error
