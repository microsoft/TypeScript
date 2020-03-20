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
function baz(_c, _d) {
    var foo = _d.foo, bar = _d.bar;
}
function one(_e, _f) { }
function two(_g, _h) {
    var _j = __read(_h, 3), a = _j[0], b = _j[1], c = _j[2];
}
