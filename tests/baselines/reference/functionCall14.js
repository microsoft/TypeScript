//// [functionCall14.js]
function foo(a) {
    var b = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        b[_i] = arguments[_i + 1];
    }
}
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);
