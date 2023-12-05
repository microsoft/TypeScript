//// [tests/cases/conformance/es6/destructuring/destructuringParameterDeclaration7ES5.ts] ////

//// [destructuringParameterDeclaration7ES5.ts]
interface ISomething {
    foo: string,
    bar: string
}

function foo({}, {foo, bar}: ISomething) {}

function baz([], {foo, bar}: ISomething) {}

function one([], {}) {}

function two([], [a, b, c]: number[]) {}


//// [destructuringParameterDeclaration7ES5.js]
function foo(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
}
function baz(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
}
function one(_a, _b) { }
function two(_a, _b) {
    var a = _b[0], b = _b[1], c = _b[2];
}
