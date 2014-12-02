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
    for (var _a = 0; _a < arguments.length; _a++) {
        x[_a - 0] = arguments[_a];
    }
    x.forEach(function (n, i) { return void ('item ' + i + ' = ' + n); });
}
function g(x, y) {
}
var n = g;
n = f;
n([4], 'foo');
