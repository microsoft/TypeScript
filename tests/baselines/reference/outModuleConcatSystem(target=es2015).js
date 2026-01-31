//// [tests/cases/compiler/outModuleConcatSystem.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [all.js]
System.register("ref/a", [], function (exports_1, context_1) {
    "use strict";
    var A;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            A = class A {
            };
            exports_1("A", A);
        }
    };
});
System.register("b", ["ref/a"], function (exports_2, context_2) {
    "use strict";
    var a_1, B;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            }
        ],
        execute: function () {
            B = class B extends a_1.A {
            };
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
