//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsTopLevelAwait.ts] ////

//// [index.js]
// cjs format file
const x = await 1;
export {x};
for await (const y of []) {}
//// [index.js]
// esm format file
const x = await 1;
export {x};
for await (const y of []) {}
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module"
}
//// [package.json]
{
    "type": "commonjs"
}

//// [index.js]
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
// cjs format file
var x = await 1;
exports.x = x;
try {
    for (var _d = true, _e = __asyncValues([]), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
        _c = _f.value;
        _d = false;
        var y = _c;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
    }
    finally { if (e_1) throw e_1.error; }
}
//// [index.js]
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
// esm format file
var x = await 1;
export { x };
try {
    for (var _d = true, _e = __asyncValues([]), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
        _c = _f.value;
        _d = false;
        var y = _c;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
    }
    finally { if (e_1) throw e_1.error; }
}


//// [index.d.ts]
export const x: 1;
//// [index.d.ts]
export const x: 1;
