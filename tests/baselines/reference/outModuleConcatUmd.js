//// [tests/cases/compiler/outModuleConcatUmd.ts] ////

//// [a.ts]

// This should error

export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [a.js]
// This should error
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ref/a"], factory);
    }
})(function (require, exports) {
    var a_1 = require("./ref/a");
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
// This should error
//# sourceMappingURL=all.js.map

//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
import { A } from "./ref/a";
export declare class B extends A {
}
//// [all.d.ts]
declare module "tests/cases/compiler/ref/a" {
    export class A {
    }
}
declare module "tests/cases/compiler/b" {
    import { A } from "tests/cases/compiler/ref/a";
    export class B extends A {
    }
}
