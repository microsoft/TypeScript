//// [primitiveConstraints1.js]
function foo1(t, u) {
}
foo1('hm', 1); // no error

function foo2(t, u) {
}
foo2(1, 'hm'); // error
