//// [useObjectValuesAndEntries1.ts]
var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);
var entries1 = Object.entries(1);
var entries2 = Object.entries({a: true, b: 2})
var entries3 = Object.entries({})


//// [useObjectValuesAndEntries1.js]
var o = { a: 1, b: 2 };
for (var _i = 0, _a = Object.values(o); _i < _a.length; _i++) {
    var x = _a[_i];
    var y = x;
}
var entries = Object.entries(o);
var entries1 = Object.entries(1);
var entries2 = Object.entries({ a: true, b: 2 });
var entries3 = Object.entries({});
