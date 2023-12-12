//// [tests/cases/compiler/objectRestSpread.ts] ////

//// [objectRestSpread.ts]
let obj = {};

({...obj});
let {
    prop = { ...obj },
    more = { ...obj } = { ...obj },
    ['' + 'other']: other = { ...obj },
    yetAnother: {nested: { ['nested' + 'prop']: nestedProp = { ...obj }, ...nestedRest } = { ...obj }} = { ...obj },
    fn = async function*() {},
    ...props
} = {} as any;

({
    prop = { ...obj },
    ['' + 'other']: other = { ...obj },
    ...props
} = {} as any)

function test({
    prop = { ...obj },
    ...props
}) {}

//// [objectRestSpread.js]
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var _a, _b, _c, _d;
let obj = {};
(Object.assign({}, obj));
let _e = {}, { prop = Object.assign({}, obj) } = _e, _f = _e.more, more = _f === void 0 ? (_a = Object.assign({}, obj), obj = __rest(_a, []), _a) : _f, _g = '' + 'other', _h = _e[_g], other = _h === void 0 ? Object.assign({}, obj) : _h, _j = _e.yetAnother, _k = _j === void 0 ? Object.assign({}, obj) : _j, _l = _k.nested, _m = _l === void 0 ? Object.assign({}, obj) : _l, _o = 'nested' + 'prop', _p = _m[_o], nestedProp = _p === void 0 ? Object.assign({}, obj) : _p, nestedRest = __rest(_m, [typeof _o === "symbol" ? _o : _o + ""]), { fn = function () { return __asyncGenerator(this, arguments, function* () { }); } } = _e, props = __rest(_e, ["prop", "more", typeof _g === "symbol" ? _g : _g + "", "yetAnother", "fn"]);
(_b = {}, { prop = Object.assign({}, obj) } = _b, _c = '' + 'other', _d = _b[_c], other = _d === void 0 ? Object.assign({}, obj) : _d, props = __rest(_b, ["prop", typeof _c === "symbol" ? _c : _c + ""]));
function test(_a) { var { prop = Object.assign({}, obj) } = _a, props = __rest(_a, ["prop"]); }
