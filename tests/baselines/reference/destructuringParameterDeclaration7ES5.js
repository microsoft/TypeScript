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
function foo({}, { foo, bar }) { }
function baz([], { foo, bar }) { }
function one([], {}) { }
function two([], [a, b, c]) { }
