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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var A = (function () {
        function A(ctor) {
        }
        return A;
    }());
    exports.A = A;
    var B = (function (_super) {
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
