//// [numericIndexExpressions.js]
var x;
x[1] = 4; // error
x['1'] = 4; // error

var y;
y['1'] = 4; // should be error
y[1] = 4; // should be error
