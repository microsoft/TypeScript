//// [trailingCommasInFunctionParametersAndArguments.ts]

function f1(x,) {}

f1(1,);

function f2(...args,) {}

f2(...[],);

// Not confused by overloads
declare function f3(x, ): number;
declare function f3(x, y,): string;

<number>f3(1,);
<string>f3(1, 2,);

// Works for constructors too
class X {
    constructor(a,) { }
    // See trailingCommasInGetter.ts
    set x(value,) { }
}
interface Y {
    new(x,);
    (x,);
}

new X(1,);


//// [trailingCommasInFunctionParametersAndArguments.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function f1(x) { }
f1(1);
function f2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
f2.apply(void 0, __spread([]));
f3(1);
f3(1, 2);
// Works for constructors too
var X = (function () {
    function X(a) {
    }
    Object.defineProperty(X.prototype, "x", {
        // See trailingCommasInGetter.ts
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    return X;
}());
new X(1);
