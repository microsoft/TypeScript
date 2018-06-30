//// [anonymousClassDeclarationDoesntPrintWithReadonly.ts]
export class X {
    constructor(readonly a: number) { }
}

export function y() {
    return class extends X { }
}

//// [anonymousClassDeclarationDoesntPrintWithReadonly.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var X = /** @class */ (function () {
    function X(a) {
        this.a = a;
    }
    return X;
}());
exports.X = X;
function y() {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(X));
}
exports.y = y;


//// [anonymousClassDeclarationDoesntPrintWithReadonly.d.ts]
export declare class X {
    readonly a: number;
    constructor(a: number);
}
export declare function y(): {
    new (a: number): {
        readonly a: number;
    };
};
