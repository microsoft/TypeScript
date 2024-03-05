//// [tests/cases/compiler/verbatim-declarations-functions.ts] ////

//// [arrowFunctionPlacement.ts]
type P = { name: string }

export let vLet = (/* param */p: P, p2: typeof p):P => null!;
export const vConst = (/* param */p: P, p2: typeof p):P => null!;

export function fn(p = (/* param */p: P, p2: typeof p):P => null!) {}

export function fnTypeFromBinding({ foo }: { foo: number }, p = (/* param */p: P, p2: typeof p, p3: typeof foo):P => null!) {}

/** p wil be resolved by the checker (requires | undefined)  */
export function fnWithRequiredDefaultParam(p = (/* param */p: P, p2: typeof p):P => null!, req: number) {}

/** p wil be resolved by the checker (requires | undefined)  */
export const exprWithRequiredDefaultParam = (p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) => {

}

export class C {
    field = (/* param */p: P, p2: typeof p):P => null!;
    readonly roFiled = (/* param */p: P, p2: typeof p):P => null!;
    method(p = (/* param */p: P, p2: typeof p):P => null!) {}
    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p = (/* param */p: P, p2: typeof p):P => null!, req: number) {}
    thisType =  (): this  => this;

    constructor(public ctorField = (/* param */p: P, p2: typeof p):P => null!) {}
}

export default (/* param */p: P, p2: typeof p):P => null!;

//// [functionExpressionPlacement.ts]
type P = { name: string }

export let vLet = function (/* param */p: P, p2: typeof p): P { return null!; };
export const vConst = function (/* param */p: P, p2: typeof p): P { return null!; };

export function fn(p = function (/* param */p: P, p2: typeof p): P { return null!; }) {}

/** p wil be resolved by the checker (requires | undefined)  */
export function fnWithRequiredDefaultParam(p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) {}

export class C {
    field = function (/* param */p: P, p2: typeof p): P { return null!; };
    readonly roFiled = function (/* param */p: P, p2: typeof p): P { return null!; };
    method(p = function (/* param */p: P, p2: typeof p): P { return null!; }) {}

    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) {}

    constructor(public ctorField = function (/* param */p: P, p2: typeof p): P { return null!; }) {}
}

export default function (/* param */p: P, p2: typeof p): P { return null!; };


//// [returnTypes.ts]
type P = { name: string }
export let fromAnnotation  = (p: P):typeof p[keyof typeof p] => null!;
export let fromInference  = (p: P) => null! as typeof p[keyof typeof p];

//// [genericFunctions.ts]
type G1 = { name: string }
export let g1 = function<T extends keyof G1>(/* param */p: T){};


// unused
type G2 = { name: string }
export let g2 = <G2 extends keyof G1>(): G2 => { return null!};

export const createClient = <D>(
  clientDef: D
): D extends new (...args: any[]) => infer D ? 
    (D extends { d: infer D } ? D: never):
    never => {
  return null! 
}

//// [arrowFunctionPlacement.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.exprWithRequiredDefaultParam = exports.fnWithRequiredDefaultParam = exports.fnTypeFromBinding = exports.fn = exports.vConst = exports.vLet = void 0;
var vLet = function (/* param */ p, p2) { return null; };
exports.vLet = vLet;
var vConst = function (/* param */ p, p2) { return null; };
exports.vConst = vConst;
function fn(p) {
    if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
}
exports.fn = fn;
function fnTypeFromBinding(_a, p) {
    var foo = _a.foo;
    if (p === void 0) { p = function (/* param */ p, p2, p3) { return null; }; }
}
exports.fnTypeFromBinding = fnTypeFromBinding;
/** p wil be resolved by the checker (requires | undefined)  */
function fnWithRequiredDefaultParam(p, req) {
    if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
}
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
/** p wil be resolved by the checker (requires | undefined)  */
var exprWithRequiredDefaultParam = function (p, req) {
    if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
};
exports.exprWithRequiredDefaultParam = exprWithRequiredDefaultParam;
var C = /** @class */ (function () {
    function C(ctorField) {
        if (ctorField === void 0) { ctorField = function (/* param */ p, p2) { return null; }; }
        var _this = this;
        this.ctorField = ctorField;
        this.field = function (/* param */ p, p2) { return null; };
        this.roFiled = function (/* param */ p, p2) { return null; };
        this.thisType = function () { return _this; };
    }
    C.prototype.method = function (p) {
        if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
    };
    /** p wil be resolved by the checker (requires | undefined)  */
    C.prototype.methodWithRequiredDefault = function (p, req) {
        if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
    };
    return C;
}());
exports.C = C;
exports.default = (function (/* param */ p, p2) { return null; });
//// [functionExpressionPlacement.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.fnWithRequiredDefaultParam = exports.fn = exports.vConst = exports.vLet = void 0;
var vLet = function (/* param */ p, p2) { return null; };
exports.vLet = vLet;
var vConst = function (/* param */ p, p2) { return null; };
exports.vConst = vConst;
function fn(p) {
    if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
}
exports.fn = fn;
/** p wil be resolved by the checker (requires | undefined)  */
function fnWithRequiredDefaultParam(p, req) {
    if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
}
exports.fnWithRequiredDefaultParam = fnWithRequiredDefaultParam;
var C = /** @class */ (function () {
    function C(ctorField) {
        if (ctorField === void 0) { ctorField = function (/* param */ p, p2) { return null; }; }
        this.ctorField = ctorField;
        this.field = function (/* param */ p, p2) { return null; };
        this.roFiled = function (/* param */ p, p2) { return null; };
    }
    C.prototype.method = function (p) {
        if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
    };
    /** p wil be resolved by the checker (requires | undefined)  */
    C.prototype.methodWithRequiredDefault = function (p, req) {
        if (p === void 0) { p = function (/* param */ p, p2) { return null; }; }
    };
    return C;
}());
exports.C = C;
function default_1(/* param */ p, p2) { return null; }
exports.default = default_1;
;
//// [returnTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromInference = exports.fromAnnotation = void 0;
var fromAnnotation = function (p) { return null; };
exports.fromAnnotation = fromAnnotation;
var fromInference = function (p) { return null; };
exports.fromInference = fromInference;
//// [genericFunctions.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.g2 = exports.g1 = void 0;
var g1 = function (/* param */ p) { };
exports.g1 = g1;
var g2 = function () { return null; };
exports.g2 = g2;
var createClient = function (clientDef) {
    return null;
};
exports.createClient = createClient;


//// [arrowFunctionPlacement.d.ts]
type P = {
    name: string;
};
export declare let vLet: (p: P, p2: P) => P;
export declare const vConst: (p: P, p2: P) => P;
export declare function fn(p?: (p: P, p2: P) => P): void;
export declare function fnTypeFromBinding({ foo }: {
    foo: number;
}, p?: (p: P, p2: P, p3: typeof foo) => P): void;
/** p wil be resolved by the checker (requires | undefined)  */
export declare function fnWithRequiredDefaultParam(p: ((p: P, p2: P) => P) | undefined, req: number): void;
/** p wil be resolved by the checker (requires | undefined)  */
export declare const exprWithRequiredDefaultParam: (p: ((p: P, p2: P) => P) | undefined, req: number) => void;
export declare class C {
    ctorField: (p: P, p2: P) => P;
    field: (p: P, p2: P) => P;
    readonly roFiled: (p: P, p2: P) => P;
    method(p?: (p: P, p2: P) => P): void;
    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p: ((p: P, p2: P) => P) | undefined, req: number): void;
    thisType: () => this;
    constructor(ctorField?: (p: P, p2: P) => P);
}
declare const _default: (p: P, p2: P) => P;
export default _default;
//// [functionExpressionPlacement.d.ts]
type P = {
    name: string;
};
export declare let vLet: (p: P, p2: P) => P;
export declare const vConst: (p: P, p2: P) => P;
export declare function fn(p?: (p: P, p2: P) => P): void;
/** p wil be resolved by the checker (requires | undefined)  */
export declare function fnWithRequiredDefaultParam(p: ((p: P, p2: P) => P) | undefined, req: number): void;
export declare class C {
    ctorField: (p: P, p2: P) => P;
    field: (p: P, p2: P) => P;
    readonly roFiled: (p: P, p2: P) => P;
    method(p?: (p: P, p2: P) => P): void;
    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p: ((p: P, p2: P) => P) | undefined, req: number): void;
    constructor(ctorField?: (p: P, p2: P) => P);
}
export default function (/* param */ p: P, p2: typeof p): P;
export {};
//// [returnTypes.d.ts]
type P = {
    name: string;
};
export declare let fromAnnotation: (p: P) => string;
export declare let fromInference: (p: P) => string;
export {};
//// [genericFunctions.d.ts]
export declare let g1: <T extends "name">(p: T) => void;
export declare let g2: <G2 extends "name">() => G2;
export declare const createClient: <D>(clientDef: D) => D extends new (...args: any[]) => infer D_1 ? D_1 extends {
    d: infer D_2;
} ? D_2 : never : never;
