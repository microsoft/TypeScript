//// [tests/cases/compiler/restArgAssignmentCompat.ts] ////

//// [restArgAssignmentCompat.ts]
function f(...x: number[]) {
    x.forEach((n, i) => void ('item ' + i + ' = ' + n));
}
function g(x: number[], y: string) { }

var n = g;
n = f;
n([4], 'foo');


//// [restArgAssignmentCompat.js]
function f() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    x.forEach(function (n, i) { return void ('item ' + i + ' = ' + n); });
}
function g(x, y) { }
var n = g;
n = f;
n([4], 'foo');
