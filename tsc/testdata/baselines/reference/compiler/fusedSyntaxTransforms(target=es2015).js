//// [tests/cases/compiler/fusedSyntaxTransforms.ts] ////

//// [fusedSyntaxTransforms.ts]
declare function receiver(): { value?: number, method?(): number };
declare function key(): "value";
declare function fallback(): number;

export function assignments() {
    receiver()[key()] ??= receiver().method?.() ?? fallback();
    receiver().value ||= receiver()?.value ?? fallback();
    receiver().value &&= receiver()?.method?.();
}

export function defaults(
    value = receiver()?.value ?? fallback(),
    next = () => receiver().value ??= value,
) {
    try {
        return next() ?? value;
    }
    catch {
        return delete receiver()?.value;
    }
}

export function calls() {
    return (receiver()?.method)?.() ?? (receiver().method)?.();
}

export async function asyncBody(values: AsyncIterable<number>) {
    for await (const value of values) {
        const { method, ...rest } = receiver();
        rest.value ??= (await method?.()) ?? value ** 2;
    }
}


//// [fusedSyntaxTransforms.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
export function assignments() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    (_f = (_d = receiver())[_e = key()]) !== null && _f !== void 0 ? _f : (_d[_e] = (_c = (_b = (_a = receiver()).method) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : fallback());
    (_j = receiver()).value || (_j.value = (_h = (_g = receiver()) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : fallback());
    (_m = receiver()).value && (_m.value = (_l = (_k = receiver()) === null || _k === void 0 ? void 0 : _k.method) === null || _l === void 0 ? void 0 : _l.call(_k));
}
export function defaults(value, next) {
    var _a, _b, _c, _d;
    if (value === void 0) { value = (_b = (_a = receiver()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : fallback(); }
    if (next === void 0) { next = () => { var _a, _b; return (_b = (_a = receiver()).value) !== null && _b !== void 0 ? _b : (_a.value = value); }; }
    try {
        return (_c = next()) !== null && _c !== void 0 ? _c : value;
    }
    catch (_e) {
        return (_d = receiver()) === null || _d === void 0 ? true : delete _d.value;
    }
}
export function calls() {
    var _a, _b, _c, _d, _e;
    return (_e = (_b = ((_a = receiver()) === null || _a === void 0 ? void 0 : _a.method)) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _e !== void 0 ? _e : (_d = ((_c = receiver()).method)) === null || _d === void 0 ? void 0 : _d.call(_c);
}
export function asyncBody(values) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, values_1, values_1_1;
        var _b, e_1, _c, _d;
        var _e, _f;
        try {
            for (_a = true, values_1 = __asyncValues(values); values_1_1 = yield values_1.next(), _b = values_1_1.done, !_b; _a = true) {
                _d = values_1_1.value;
                _a = false;
                const value = _d;
                const _g = receiver(), { method } = _g, rest = __rest(_g, ["method"]);
                (_f = rest.value) !== null && _f !== void 0 ? _f : (rest.value = (_e = (yield method === null || method === void 0 ? void 0 : method())) !== null && _e !== void 0 ? _e : Math.pow(value, 2));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = values_1.return)) yield _c.call(values_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
//# sourceMappingURL=fusedSyntaxTransforms.js.map