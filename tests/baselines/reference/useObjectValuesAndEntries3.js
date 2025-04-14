//// [tests/cases/conformance/es2017/useObjectValuesAndEntries3.ts] ////

//// [useObjectValuesAndEntries3.ts]
var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);

//// [useObjectValuesAndEntries3.js]
var o = { a: 1, b: 2 };
for (var x of Object.values(o)) {
    let y = x;
}
var entries = Object.entries(o);
