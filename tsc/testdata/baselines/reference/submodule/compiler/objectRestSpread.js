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
var _a, _b, _c, _d;
let obj = {};
(Object.assign({}, obj));
let _e = {}, { prop = Object.assign({}, obj), more = (_a = Object.assign({}, obj), obj = __rest(_a, [])) } = _e, _f = '' + 'other', _g = _e[_f], other = _g === void 0 ? Object.assign({}, obj) : _g, _h = _e.yetAnother, _j = _h === void 0 ? Object.assign({}, obj) : _h, _k = _j.nested, _l = _k === void 0 ? Object.assign({}, obj) : _k, _m = 'nested' + 'prop', _o = _l[_m], nestedProp = _o === void 0 ? Object.assign({}, obj) : _o, nestedRest = __rest(_l, [typeof _m === "symbol" ? _m : _m + ""]), { fn = async function* () { } } = _e, props = __rest(_e, ["prop", "more", typeof _f === "symbol" ? _f : _f + "", "yetAnother", "fn"]);
(_b = {}, { prop = Object.assign({}, obj) } = _b, _c = '' + 'other', _d = _b[_c], other = _d === void 0 ? Object.assign({}, obj) : _d, props = __rest(_b, ["prop", typeof _c === "symbol" ? _c : _c + ""]));
function test(_a) { var { prop = Object.assign({}, obj) } = _a, props = __rest(_a, ["prop"]); }
