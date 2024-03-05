//// [tests/cases/compiler/verbatim-declarations-assertions.ts] ////

//// [assertToTypeReferences.ts]
type P = { } & { name: string }

export let vLet = null! as P
export const vConst = null! as P

export function fn(p = null! as P) {}

export function fnWithRequiredDefaultParam(p = null! as P, req: number) {}

export class C {
    field = null! as P
    readonly roFiled = null! as P;
    method(p = null! as P) {}
    methodWithRequiredDefault(p = null! as P, req: number) {}

    constructor(public ctorField = null! as P) {}
}

export default null! as P;

//// [assertToTypeLiteral.ts]
export let vLet = null! as {} & { name: string }
export const vConst = null! as {} & { name: string }

export function fn(p = null! as {} & { name: string }) {}

export function fnWithRequiredDefaultParam(p = null! as {} & { name: string }, req: number) {}

export class C {
    field = null! as {} & { name: string }
    readonly roFiled = null! as {} & { name: string };
    method(p = null! as {} & { name: string }) {}
    methodWithRequiredDefault(p = null! as {} & { name: string }, req: number) {}

    constructor(public ctorField = null! as {} & { name: string }) {}

    get x() { return null! as {} & { name: string } }
    set x(v) { }
}

export default null! as {} & { name: string }


//// [assertToOtherTypes.ts]
export const vNumberLiteral = null! as 1 | 1
export const vStringLiteral = null! as "1" | "1"
export const vLiteral = null! as "1" | "1"

type R = { foo: string }

export class C {
    // under !strictNullChecks all types can be reused from the assertion
    // under strictNullChecks we need to add undefined, and we can't always know we can
    // Can't know if references contain undefined, fall back to inference
    tsResolve? = null! as R | R;
    tsResolve2? = null! as R | R | string;
    // Simple type. we can add undefined
    reuseType? = null! as ((p: R) => void) | string | string;
    reuseType2? = null! as (new (p: R) => R) | string | string;
    reuseType3? = null! as string | number | bigint | symbol | unknown | any | never | symbol;
    reuseType4? = null! as [R, R, R] | [R, R, R];
    reuseType5? = null! as R[] | R[];
    reuseType6? = null! as 1 | "2" | 1n | 1n;
    reuseType7? = null! as `A` | `A`;
    reuseType8? = null! as `${string}-ok` | `${string}-ok`;
    reuseType9? = null! as this | this;
}

//// [angularAssertionToTypeReferences.ts]
type P = { } & { name: string }

export let vLet = <P>null!
export const vConst = <P>null!

export function fn(p = <P>null!) {}

export function fnWithRequiredDefaultParam(p = <P>null!, req: number) {}

export class C {
    field = <P>null!
    optField? = <P>null!
    readonly roFiled = <P>null!;
    method(p = <P>null!) {}
    methodWithRequiredDefault(p = <P>null!, req: number) {}

    constructor(public ctorField = <P>null!) {}
}

//// [assertToTypeReferences.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.fnWithRequiredDefaultParam = exports.fn = exports.vConst = exports.vLet = void 0;
exports.vLet = null;
exports.vConst = null;
function fn(p) {
    if (p === void 0) { p = null; }
}
exports.fn = fn;
function fnWithRequiredDefaultParam(p, req) {
    if (p === void 0) { p = null; }
}
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
var C = /** @class */ (function () {
    function C(ctorField) {
        if (ctorField === void 0) { ctorField = null; }
        this.ctorField = ctorField;
        this.field = null;
        this.roFiled = null;
    }
    C.prototype.method = function (p) {
        if (p === void 0) { p = null; }
    };
    C.prototype.methodWithRequiredDefault = function (p, req) {
        if (p === void 0) { p = null; }
    };
    return C;
}());
exports.C = C;
exports.default = null;
//// [assertToTypeLiteral.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.fnWithRequiredDefaultParam = exports.fn = exports.vConst = exports.vLet = void 0;
exports.vLet = null;
exports.vConst = null;
function fn(p) {
    if (p === void 0) { p = null; }
}
exports.fn = fn;
function fnWithRequiredDefaultParam(p, req) {
    if (p === void 0) { p = null; }
}
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
var C = /** @class */ (function () {
    function C(ctorField) {
        if (ctorField === void 0) { ctorField = null; }
        this.ctorField = ctorField;
        this.field = null;
        this.roFiled = null;
    }
    C.prototype.method = function (p) {
        if (p === void 0) { p = null; }
    };
    C.prototype.methodWithRequiredDefault = function (p, req) {
        if (p === void 0) { p = null; }
    };
    Object.defineProperty(C.prototype, "x", {
        get: function () { return null; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
exports.C = C;
exports.default = null;
//// [assertToOtherTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.vLiteral = exports.vStringLiteral = exports.vNumberLiteral = void 0;
exports.vNumberLiteral = null;
exports.vStringLiteral = null;
exports.vLiteral = null;
var C = /** @class */ (function () {
    function C() {
        // under !strictNullChecks all types can be reused from the assertion
        // under strictNullChecks we need to add undefined, and we can't always know we can
        // Can't know if references contain undefined, fall back to inference
        this.tsResolve = null;
        this.tsResolve2 = null;
        // Simple type. we can add undefined
        this.reuseType = null;
        this.reuseType2 = null;
        this.reuseType3 = null;
        this.reuseType4 = null;
        this.reuseType5 = null;
        this.reuseType6 = null;
        this.reuseType7 = null;
        this.reuseType8 = null;
        this.reuseType9 = null;
    }
    return C;
}());
exports.C = C;
//// [angularAssertionToTypeReferences.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.fnWithRequiredDefaultParam = exports.fn = exports.vConst = exports.vLet = void 0;
exports.vLet = null;
exports.vConst = null;
function fn(p) {
    if (p === void 0) { p = null; }
}
exports.fn = fn;
function fnWithRequiredDefaultParam(p, req) {
    if (p === void 0) { p = null; }
}
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
var C = /** @class */ (function () {
    function C(ctorField) {
        if (ctorField === void 0) { ctorField = null; }
        this.ctorField = ctorField;
        this.field = null;
        this.optField = null;
        this.roFiled = null;
    }
    C.prototype.method = function (p) {
        if (p === void 0) { p = null; }
    };
    C.prototype.methodWithRequiredDefault = function (p, req) {
        if (p === void 0) { p = null; }
    };
    return C;
}());
exports.C = C;


//// [assertToTypeReferences.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): void;
export declare function fnWithRequiredDefaultParam(p: P, req: number): void;
export declare class C {
    ctorField: P;
    field: P;
    readonly roFiled: P;
    method(p?: P): void;
    methodWithRequiredDefault(p: P, req: number): void;
    constructor(ctorField?: P);
}
declare const _default: {
    name: string;
};
export default _default;
//// [assertToTypeLiteral.d.ts]
export declare let vLet: {} & {
    name: string;
};
export declare const vConst: {} & {
    name: string;
};
export declare function fn(p?: {} & {
    name: string;
}): void;
export declare function fnWithRequiredDefaultParam(p: {} & {
    name: string;
}, req: number): void;
export declare class C {
    ctorField: {} & {
        name: string;
    };
    field: {} & {
        name: string;
    };
    readonly roFiled: {} & {
        name: string;
    };
    method(p?: {} & {
        name: string;
    }): void;
    methodWithRequiredDefault(p: {} & {
        name: string;
    }, req: number): void;
    constructor(ctorField?: {} & {
        name: string;
    });
    get x(): {
        name: string;
    };
    set x(v: {
        name: string;
    });
}
declare const _default: {
    name: string;
};
export default _default;
//// [assertToOtherTypes.d.ts]
export declare const vNumberLiteral: 1 | 1;
export declare const vStringLiteral: "1" | "1";
export declare const vLiteral: "1" | "1";
type R = {
    foo: string;
};
export declare class C {
    tsResolve?: R | R;
    tsResolve2?: R | R | string;
    reuseType?: ((p: R) => void) | string | string;
    reuseType2?: (new (p: R) => R) | string | string;
    reuseType3?: string | number | bigint | symbol | unknown | any | never | symbol;
    reuseType4?: [R, R, R] | [R, R, R];
    reuseType5?: R[] | R[];
    reuseType6?: 1 | "2" | 1n | 1n;
    reuseType7?: `A` | `A`;
    reuseType8?: `${string}-ok` | `${string}-ok`;
    reuseType9?: this | this;
}
export {};
//// [angularAssertionToTypeReferences.d.ts]
type P = {} & {
    name: string;
};
export declare let vLet: P;
export declare const vConst: P;
export declare function fn(p?: P): void;
export declare function fnWithRequiredDefaultParam(p: P, req: number): void;
export declare class C {
    ctorField: P;
    field: P;
    optField?: P;
    readonly roFiled: P;
    method(p?: P): void;
    methodWithRequiredDefault(p: P, req: number): void;
    constructor(ctorField?: P);
}
export {};
