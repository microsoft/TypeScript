//// [tests/cases/compiler/inferSecondaryParameter.ts] ////

//// [inferSecondaryParameter.ts]
// type inference on 'bug' should give 'any'

interface Ib { m(test: string, fn: Function); }

var b: Ib = { m: function (test: string, fn: Function) { } };

b.m("test", function (bug) {
    var a: number = bug;
});

//// [inferSecondaryParameter.js]
// type inference on 'bug' should give 'any'
var b = { m: function (test, fn) { } };
b.m("test", function (bug) {
    var a = bug;
});
