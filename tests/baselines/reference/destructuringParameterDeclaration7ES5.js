//// [destructuringParameterDeclaration7ES5.ts]

interface ISomething {
    foo: string,
    bar: string
}

function foo({}, {foo, bar}: ISomething) {}


//// [destructuringParameterDeclaration7ES5.js]
function foo(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
}
