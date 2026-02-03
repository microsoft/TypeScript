//// [tests/cases/compiler/functionAssignment.ts] ////

//// [functionAssignment.ts]
function f(n: Function) { }
f(function () { });

interface foo {
    get(handler: (bar: number)=>void): void;
}

interface baz {
    get(callback: Function): number;
}

var barbaz: baz;
var test: foo;

test.get(function (param) {
    var x = barbaz.get(function () { });
});

function f2(n: () => void) { }
f2(() => {
    var n = '';
    n = 4;
});

function f3(a: { a: number; b: number; }) { }

f3({ a: 0, b: 0 });


function callb(lam:(l: number) => void );
function callb(lam:(n: string)=>void);
function callb(a) { }

callb((a) =>{ a.length; });




//// [functionAssignment.js]
function f(n) { }
f(function () { });
var barbaz;
var test;
test.get(function (param) {
    var x = barbaz.get(function () { });
});
function f2(n) { }
f2(function () {
    var n = '';
    n = 4;
});
function f3(a) { }
f3({ a: 0, b: 0 });
function callb(a) { }
callb(function (a) { a.length; });
