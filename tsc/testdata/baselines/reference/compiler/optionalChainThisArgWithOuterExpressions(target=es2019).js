//// [tests/cases/compiler/optionalChainThisArgWithOuterExpressions.ts] ////

//// [optionalChainThisArgWithOuterExpressions.ts]
// https://github.com/microsoft/TypeScript/issues/65597

interface Fns {
    fn(...args: unknown[]): unknown;
    gen<T>(...args: unknown[]): T;
}

declare const obj: Fns & { nested: Fns };

// optional calls of wrapped callees
(obj?.fn!)?.();
(obj.fn!)?.();
(obj?.fn as any)?.();
(obj.fn as any)?.();
(obj.gen<string>)?.();
obj.gen<string>?.();
(obj?.["fn"]!)?.(1);
(obj.nested?.fn!)?.(1);

// plain calls of wrapped optional chains
(obj?.fn)();
(obj?.fn!)();
(obj?.fn as any)();
(obj?.fn)!();
(obj?.fn satisfies unknown)();
(<any>obj?.fn)();
(obj?.gen<string>)();
(obj?.["fn"]!)(1);
(obj.nested?.fn!)(1);

// tagged templates with wrapped optional chain tags
(obj?.fn)`x`;
(obj?.["fn"])`x${1}`;
(obj?.fn!)`x`;
(obj?.fn as any)`x`;
(obj.nested?.fn)`x`;

class Base {
    fn(...args: unknown[]): unknown { return this; }
}

class Derived extends Base {
    method() {
        (super.fn!)?.();
        (super.fn as any)?.();
    }
}


//// [optionalChainThisArgWithOuterExpressions.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/65597
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
// optional calls of wrapped callees
(_a = (obj === null || obj === void 0 ? void 0 : obj.fn)) === null || _a === void 0 ? void 0 : _a.call(obj);
(_b = (obj.fn)) === null || _b === void 0 ? void 0 : _b.call(obj);
(_c = obj === null || obj === void 0 ? void 0 : obj.fn) === null || _c === void 0 ? void 0 : _c.call(obj);
(_d = obj.fn) === null || _d === void 0 ? void 0 : _d.call(obj);
(_e = (obj.gen)) === null || _e === void 0 ? void 0 : _e.call(obj);
(_f = obj.gen) === null || _f === void 0 ? void 0 : _f.call(obj);
(_g = (obj === null || obj === void 0 ? void 0 : obj["fn"])) === null || _g === void 0 ? void 0 : _g.call(obj, 1);
(_j = ((_h = obj.nested) === null || _h === void 0 ? void 0 : _h.fn)) === null || _j === void 0 ? void 0 : _j.call(_h, 1);
// plain calls of wrapped optional chains
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
(obj === null || obj === void 0 ? void 0 : obj.fn).call(obj);
((obj === null || obj === void 0 ? void 0 : obj.gen)).call(obj);
(obj === null || obj === void 0 ? void 0 : obj["fn"]).call(obj, 1);
((_k = obj.nested) === null || _k === void 0 ? void 0 : _k.fn).call(_k, 1);
// tagged templates with wrapped optional chain tags
(obj === null || obj === void 0 ? void 0 : obj.fn).bind(obj) `x`;
(obj === null || obj === void 0 ? void 0 : obj["fn"]).bind(obj) `x${1}`;
(obj === null || obj === void 0 ? void 0 : obj.fn).bind(obj) `x`;
(obj === null || obj === void 0 ? void 0 : obj.fn).bind(obj) `x`;
((_l = obj.nested) === null || _l === void 0 ? void 0 : _l.fn).bind(_l) `x`;
class Base {
    fn(...args) { return this; }
}
class Derived extends Base {
    method() {
        var _a, _b;
        (_a = (super.fn)) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = super.fn) === null || _b === void 0 ? void 0 : _b.call(this);
    }
}
