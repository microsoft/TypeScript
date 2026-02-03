//// [tests/cases/conformance/es2017/useObjectValuesAndEntries1.ts] ////

//// [useObjectValuesAndEntries1.ts]
var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);                    // [string, number][]
var values = Object.values(o);                      // number[]

var entries1 = Object.entries(1);                   // [string, any][]
var values1 = Object.values(1);                     // any[]

var entries2 = Object.entries({ a: true, b: 2 });   // [string, number|boolean][]
var values2 = Object.values({ a: true, b: 2 });     // (number|boolean)[]

var entries3 = Object.entries({});                  // [string, {}][]
var values3 = Object.values({});                    // {}[]

var a = ["a", "b", "c"];
var entries4 = Object.entries(a);                   // [string, string][]
var values4 = Object.values(a);                     // string[]

enum E { A, B }
var entries5 = Object.entries(E);                   // [string, any][]
var values5 = Object.values(E);                     // any[]

interface I { }
var i: I = {};
var entries6 = Object.entries(i);                   // [string, any][]
var values6 = Object.values(i);                     // any[]

//// [useObjectValuesAndEntries1.js]
var o = { a: 1, b: 2 };
for (var _i = 0, _a = Object.values(o); _i < _a.length; _i++) {
    var x = _a[_i];
    var y = x;
}
var entries = Object.entries(o); // [string, number][]
var values = Object.values(o); // number[]
var entries1 = Object.entries(1); // [string, any][]
var values1 = Object.values(1); // any[]
var entries2 = Object.entries({ a: true, b: 2 }); // [string, number|boolean][]
var values2 = Object.values({ a: true, b: 2 }); // (number|boolean)[]
var entries3 = Object.entries({}); // [string, {}][]
var values3 = Object.values({}); // {}[]
var a = ["a", "b", "c"];
var entries4 = Object.entries(a); // [string, string][]
var values4 = Object.values(a); // string[]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
var entries5 = Object.entries(E); // [string, any][]
var values5 = Object.values(E); // any[]
var i = {};
var entries6 = Object.entries(i); // [string, any][]
var values6 = Object.values(i); // any[]
