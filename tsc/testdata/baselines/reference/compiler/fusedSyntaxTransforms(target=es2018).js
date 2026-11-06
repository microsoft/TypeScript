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
export async function asyncBody(values) {
    var _a, _b;
    for await (const value of values) {
        const { method, ...rest } = receiver();
        (_b = rest.value) !== null && _b !== void 0 ? _b : (rest.value = (_a = (await (method === null || method === void 0 ? void 0 : method()))) !== null && _a !== void 0 ? _a : value ** 2);
    }
}
//# sourceMappingURL=fusedSyntaxTransforms.js.map