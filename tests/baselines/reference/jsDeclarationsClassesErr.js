//// [index.js]
// Pretty much all of this should be an error, (since index signatures and generics are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export class M<T> {
    field: T;
}

export class N<U> extends M<U> {
    other: U;
}

export class O {
    [idx: string]: string;
}

export class P extends O {}

export class Q extends O {
    [idx: string]: "ok";
}

export class R extends O {
    [idx: number]: "ok";
}

export class S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}

export class T {
    [idx: number]: string;
}

export class U extends T {}


export class V extends T {
    [idx: string]: string;
}

export class W extends T {
    [idx: number]: "ok";
}

export class X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}

export class Y {
    [idx: string]: {x: number};
    [idx: number]: {x: number, y: number};
}

export class Z extends Y {}

export class AA extends Y {
    [idx: string]: {x: number, y: number};
}

export class BB extends Y {
    [idx: number]: {x: 0, y: 0};
}

export class CC extends Y {
    [idx: string]: {x: number, y: number};
    [idx: number]: {x: 0, y: 0};
}


//// [index.js]
"use strict";
// Pretty much all of this should be an error, (since index signatures and generics are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CC = exports.BB = exports.AA = exports.Z = exports.Y = exports.X = exports.W = exports.V = exports.U = exports.T = exports.S = exports.R = exports.Q = exports.P = exports.O = exports.N = exports.M = void 0;
var M = /** @class */ (function () {
    function M() {
    }
    return M;
}());
exports.M = M;
var N = /** @class */ (function (_super) {
    __extends(N, _super);
    function N() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return N;
}(M));
exports.N = N;
var O = /** @class */ (function () {
    function O() {
    }
    return O;
}());
exports.O = O;
var P = /** @class */ (function (_super) {
    __extends(P, _super);
    function P() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return P;
}(O));
exports.P = P;
var Q = /** @class */ (function (_super) {
    __extends(Q, _super);
    function Q() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Q;
}(O));
exports.Q = Q;
var R = /** @class */ (function (_super) {
    __extends(R, _super);
    function R() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return R;
}(O));
exports.R = R;
var S = /** @class */ (function (_super) {
    __extends(S, _super);
    function S() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return S;
}(O));
exports.S = S;
var T = /** @class */ (function () {
    function T() {
    }
    return T;
}());
exports.T = T;
var U = /** @class */ (function (_super) {
    __extends(U, _super);
    function U() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return U;
}(T));
exports.U = U;
var V = /** @class */ (function (_super) {
    __extends(V, _super);
    function V() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return V;
}(T));
exports.V = V;
var W = /** @class */ (function (_super) {
    __extends(W, _super);
    function W() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return W;
}(T));
exports.W = W;
var X = /** @class */ (function (_super) {
    __extends(X, _super);
    function X() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return X;
}(T));
exports.X = X;
var Y = /** @class */ (function () {
    function Y() {
    }
    return Y;
}());
exports.Y = Y;
var Z = /** @class */ (function (_super) {
    __extends(Z, _super);
    function Z() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Z;
}(Y));
exports.Z = Z;
var AA = /** @class */ (function (_super) {
    __extends(AA, _super);
    function AA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AA;
}(Y));
exports.AA = AA;
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(Y));
exports.BB = BB;
var CC = /** @class */ (function (_super) {
    __extends(CC, _super);
    function CC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CC;
}(Y));
exports.CC = CC;


//// [index.d.ts]
export class M<T> {
    field: T;
}
export class N<U> extends M<U> {
    other: U;
}
export class O {
    [idx: string]: string;
}
export class P extends O {
}
export class Q extends O {
    [idx: string]: "ok";
}
export class R extends O {
    [idx: number]: "ok";
}
export class S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}
export class T {
    [idx: number]: string;
}
export class U extends T {
}
export class V extends T {
    [idx: string]: string;
}
export class W extends T {
    [idx: number]: "ok";
}
export class X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}
export class Y {
    [idx: string]: {
        x: number;
    };
    [idx: number]: {
        x: number;
        y: number;
    };
}
export class Z extends Y {
}
export class AA extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
}
export class BB extends Y {
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
export class CC extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
