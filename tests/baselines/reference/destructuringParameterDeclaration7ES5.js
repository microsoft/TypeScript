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
function baz(_c, _d) {
    var foo = _d.foo, bar = _d.bar;
}
function one(_e, _f) { }
function two(_g, _h) {
    var a = _h[0], b = _h[1], c = _h[2];
}
