// @target: es5
// @lib: es5,es2017.object

var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);  // <-- entries: [('a' & string) | ('b' & string), number][]
var entries1 = Object.entries(1); // <-- entries: [string, any][]
var entries2 = Object.entries({a: true, b: 2}) // [('a' & string) | ('b' & string), number | boolean][]
var entries3 = Object.entries({}) // [string, any][]
var entries4 = Object.entries([1, 2, 3, 4]); // [string, number][]

// type below should be [string | (string & number), any] NOT [string | number, any]
var x2: { [index: string]: any } = {1: 2};
var entries5 = Object.entries(x2);
