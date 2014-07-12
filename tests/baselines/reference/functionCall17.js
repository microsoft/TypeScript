//// [functionCall17.js]
function foo(a, b, c) {
    var d = [];
    for (var _i = 0; _i < (arguments.length - 3); _i++) {
        d[_i] = arguments[_i + 3];
    }
}
foo('foo', 1);
foo('foo');
foo();
foo(1, 'bar');
foo('foo', 1, 3);
foo('foo', 'bar', 3, 4);
