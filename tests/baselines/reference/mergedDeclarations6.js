//// [tests/cases/compiler/mergedDeclarations6.ts] ////

//// [a.ts]
export class A {
    protected protected: any;

    protected setProtected(val: any) {
        this.protected = val;
    }
}

//// [b.ts]
import {A} from './a';

declare module "./a" {
    interface A { }
}

export class B extends A {
    protected setProtected() {

    }
}

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    var A = /** @class */ (function () {
        function A() {
        }
        A.prototype.setProtected = function (val) {
            this.protected = val;
        };
        return A;
    }());
    exports.A = A;
});
//// [b.js]
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
define(["require", "exports", "./a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = void 0;
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        B.prototype.setProtected = function () {
        };
        return B;
    }(a_1.A));
    exports.B = B;
});
