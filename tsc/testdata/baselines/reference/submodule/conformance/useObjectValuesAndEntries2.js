//// [tests/cases/conformance/es2017/useObjectValuesAndEntries2.ts] ////

//// [useObjectValuesAndEntries2.ts]
var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);

//// [useObjectValuesAndEntries2.js]
var o = { a: 1, b: 2 };
for (var x of Object.values(o)) {
    let y = x;
}
var entries = Object.entries(o);
