//// [restArgAssignmentCompat.js]
function f() {
    var x = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        x[_i] = arguments[_i + 0];
    }
    x.forEach(function (n, i) {
        return void ('item ' + i + ' = ' + n);
    });
}
function g(x, y) {
}

var n = g;
n = f;
n([4], 'foo');
