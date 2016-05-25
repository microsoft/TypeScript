// @target: es5
// @lib: es5,es2017.object

var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);
var entries1 = Object.entries(1); // <-- entries: [string, any][]