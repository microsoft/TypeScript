//// [tests/cases/compiler/outModuleConcatAmd.ts] ////

//// [a.ts]

export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [a.js]
define(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    exports.A = A;
});
//# sourceMappingURL=a.js.map//// [b.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./ref/a"], function (require, exports, a_1) {
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(a_1.A);
    exports.B = B;
});
//# sourceMappingURL=b.js.map//// [all.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/ref/a", ["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    exports.A = A;
});
define("tests/cases/compiler/b", ["require", "exports", "tests/cases/compiler/ref/a"], function (require, exports, a_1) {
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(a_1.A);
    exports.B = B;
});
//# sourceMappingURL=all.js.map

//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
import { A } from "./ref/a";
export declare class B extends A {
}
//// [all.d.ts]
