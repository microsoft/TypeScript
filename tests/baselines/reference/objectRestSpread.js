//// [objectRestSpread.ts]
let obj = {};

({...obj});
let {
    prop = { ...obj },
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
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var _a, _b, _c;
let obj = {};
(Object.assign({}, obj));
let _d = {}, { prop = Object.assign({}, obj) } = _d, _e = '' + 'other', _f = _d[_e], other = _f === void 0 ? Object.assign({}, obj) : _f, _g = _d.yetAnother, _h = (_g === void 0 ? Object.assign({}, obj) : _g).nested, _j = _h === void 0 ? Object.assign({}, obj) : _h, _k = 'nested' + 'prop', _l = _j[_k], nestedProp = _l === void 0 ? Object.assign({}, obj) : _l, nestedRest = __rest(_j, [typeof _k === "symbol" ? _k : _k + ""]), { fn = function () { return __asyncGenerator(this, arguments, function* () { }); } } = _d, props = __rest(_d, ["prop", typeof _e === "symbol" ? _e : _e + "", "yetAnother", "fn"]);
(_a = {}, { prop = Object.assign({}, obj) } = _a, _b = '' + 'other', _c = _a[_b], other = _c === void 0 ? Object.assign({}, obj) : _c, props = __rest(_a, ["prop", typeof _b === "symbol" ? _b : _b + ""]));
function test(_a) { var { prop = Object.assign({}, obj) } = _a, props = __rest(_a, ["prop"]); }
