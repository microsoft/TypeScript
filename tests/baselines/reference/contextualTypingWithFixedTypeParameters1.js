//// [contextualTypingWithFixedTypeParameters1.js]
var f10;
f10('', function () {
    return function (a) {
        return a.foo;
    };
}, ''); // a is string, fixed by first parameter
var r9 = f10('', function () {
    return (function (a) {
        return a.foo;
    });
}, 1); // now a should be any
