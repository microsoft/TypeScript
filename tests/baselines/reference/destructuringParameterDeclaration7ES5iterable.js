//// [destructuringParameterDeclaration7ES5iterable.ts]
interface ISomething {
    foo: string,
    bar: string
}

function foo({}, {foo, bar}: ISomething) {}

function baz([], {foo, bar}: ISomething) {}

function one([], {}) {}

function two([], [a, b, c]: number[]) {}


//// [destructuringParameterDeclaration7ES5iterable.js]
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
function foo(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
}
function baz(_a, _b) {
    var foo = _b.foo, bar = _b.bar;
}
function one(_a, _b) { }
function two(_a, _b) {
    var _c = __read(_b, 3), a = _c[0], b = _c[1], c = _c[2];
}
