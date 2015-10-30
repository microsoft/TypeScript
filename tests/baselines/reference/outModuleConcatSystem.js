//// [tests/cases/compiler/outModuleConcatSystem.ts] ////

//// [a.ts]

export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [all.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("tests/cases/compiler/ref/a", [], function(exports_1) {
    var A;
    return {
        setters:[],
        execute: function() {
            A = (function () {
                function A() {
                }
                return A;
            })();
            exports_1("A", A);
        }
    }
});
System.register("tests/cases/compiler/b", ["tests/cases/compiler/ref/a"], function(exports_2) {
    var a_1;
    var B;
    return {
        setters:[
            function (a_1_1) {
                a_1 = a_1_1;
            }],
        execute: function() {
            B = (function (_super) {
                __extends(B, _super);
                function B() {
                    _super.apply(this, arguments);
                }
                return B;
            })(a_1.A);
            exports_2("B", B);
        }
    }
});
//# sourceMappingURL=all.js.map

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
