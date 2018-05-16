//// [tests/cases/compiler/outModuleConcatSystem.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [all.js]
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
System.register("ref/a", [], function (exports_1, context_1) {
    var A;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            A = /** @class */ (function () {
                function A() {
                }
                return A;
            }());
            exports_1("A", A);
        }
    };
});
System.register("b", ["ref/a"], function (exports_2, context_2) {
    var a_1, B;
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            B = /** @class */ (function (_super) {
                __extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return B;
            }(a_1.A));
            exports_2("B", B);
        }
    };
});
//# sourceMappingURL=all.js.map

//// [all.d.ts]
declare module "ref/a" {
    export class A {
    }
}
declare module "b" {
    import { A } from "ref/a";
    export class B extends A {
    }
}
