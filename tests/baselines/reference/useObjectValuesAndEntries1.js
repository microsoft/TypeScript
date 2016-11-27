//// [useObjectValuesAndEntries1.ts]

var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);  // <-- entries: ['a' | 'b', number][]
var entries1 = Object.entries(1); // <-- entries: [string, any][]
var entries2 = Object.entries({a: true, b: 2}) // [('a' | 'b'), number | boolean][]
var entries3 = Object.entries({}) // [never, any][]
var entries4 = Object.entries([1, 2, 3, 4]); // [string, number][]

var x2: { [index: string]: any } = {1: 2};
var entries5 = Object.entries(x2); // [string, any][]


//// [useObjectValuesAndEntries1.js]
var o = { a: 1, b: 2 };
for (var _i = 0, _a = Object.values(o); _i < _a.length; _i++) {
    var x = _a[_i];
    var y = x;
}
var entries = Object.entries(o); // <-- entries: ['a' | 'b', number][]
var entries1 = Object.entries(1); // <-- entries: [string, any][]
var entries2 = Object.entries({ a: true, b: 2 }); // [('a' | 'b'), number | boolean][]
var entries3 = Object.entries({}); // [never, any][]
var entries4 = Object.entries([1, 2, 3, 4]); // [string, number][]
var x2 = { 1: 2 };
var entries5 = Object.entries(x2); // [string, any][]
