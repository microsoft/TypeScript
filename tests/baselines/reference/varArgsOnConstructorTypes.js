//// [tests/cases/compiler/varArgsOnConstructorTypes.ts] ////

//// [varArgsOnConstructorTypes.ts]
export class A {
    constructor(ctor) { }
}

export class B extends A {
    private p1: number;
    private p2: string;

    constructor(element: any, url: string) {
       super(element);
        this.p1 = element;
        this.p2 = url;
    }
}

export interface I1 {
    register(inputClass: new(...params: any[]) => A);
    register(inputClass: { new (...params: any[]): A; }[]);
}


var reg: I1;
reg.register(B);


//// [varArgsOnConstructorTypes.js]
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = exports.A = void 0;
    var A = /** @class */ (function () {
        function A(ctor) {
        }
        return A;
    }());
    exports.A = A;
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B(element, url) {
            var _this = _super.call(this, element) || this;
            _this.p1 = element;
            _this.p2 = url;
            return _this;
        }
        return B;
    }(A));
    exports.B = B;
    var reg;
    reg.register(B);
});
