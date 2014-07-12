function foo<T>(x: { bar: T; baz: T }) {
    return x;
}

var r = foo({ bar: 1, baz: '' }); // T = {}
var r2 = foo({ bar: 1, baz: 1 }); // T = number
// BUG 835724
var r3 = foo({ bar: foo, baz: foo }); // T = any
var r4 = foo<Object>({ bar: 1, baz: '' }); // T = Object