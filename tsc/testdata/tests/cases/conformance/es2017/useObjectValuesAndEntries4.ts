// @target: es6
// @lib: es2017

var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);