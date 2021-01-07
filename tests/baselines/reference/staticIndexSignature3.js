//// [staticIndexSignature3.ts]
class B {
    static readonly [s: string]: number;
    static readonly [s: number]: 42 | 233
}

class D extends B {
    static readonly [s: string]: number
}

class ED extends D {
    static readonly [s: string]: boolean
    static readonly [s: number]: 1 
}

class DD extends D {
    static readonly [s: string]: 421
}

const a = B["f"];
const b =  B[42];
const c = D["f"]
const d = D[42]
const e = ED["f"]
const f = ED[42]
const g = DD["f"]
const h = DD[42]


//// [staticIndexSignature3.js]
"use strict";
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
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(B));
var ED = /** @class */ (function (_super) {
    __extends(ED, _super);
    function ED() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ED;
}(D));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DD;
}(D));
var a = B["f"];
var b = B[42];
var c = D["f"];
var d = D[42];
var e = ED["f"];
var f = ED[42];
var g = DD["f"];
var h = DD[42];
