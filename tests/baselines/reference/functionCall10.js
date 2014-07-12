//// [functionCall10.js]
function foo() {
    var a = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        a[_i] = arguments[_i + 0];
    }
}
;
foo(0, 1);
foo('foo');
foo();
foo(1, 'bar');
