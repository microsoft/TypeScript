//// [functionCall16.js]
function foo(a, b) {
    var c = [];
    for (var _i = 0; _i < (arguments.length - 2); _i++) {
        c[_i] = arguments[_i + 2];
    }
}
foo('foo', 1);
foo('foo');
foo('foo', 'bar');
foo();
foo(1, 'bar');
foo('foo', 'bar', 3);
