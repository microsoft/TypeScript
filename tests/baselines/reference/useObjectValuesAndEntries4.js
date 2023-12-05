//// [tests/cases/conformance/es2017/useObjectValuesAndEntries4.ts] ////

//// [useObjectValuesAndEntries4.ts]
var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);

//// [useObjectValuesAndEntries4.js]
var o = { a: 1, b: 2 };
for (var x of Object.values(o)) {
    let y = x;
}
var entries = Object.entries(o);
