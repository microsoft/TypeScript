//// [tests/cases/compiler/decoratorMissingClassExpression.ts] ////

//// [assignment.ts]
let x;
x = @dec 1;
x = @@a 1;

//// [forAwait.ts]
async function f(y: any) {
    for await (@d of y) {}
}

//// [destructuring.ts]
({...@d} = {});


//// [assignment.js]
"use strict";
let x;
x = ;
1;
x = ;
1;
//// [forAwait.js]
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
async function f(y) {
    var _a, e_1, _b, _c;
    try {
        for (var _d = true, y_1 = __asyncValues(y), y_1_1; y_1_1 = await y_1.next(), _a = y_1_1.done, !_a; _d = true) {
            _c = y_1_1.value;
            _d = false;
             = _c;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = y_1.return)) await _b.call(y_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
//// [destructuring.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
( = __rest({}, []));
