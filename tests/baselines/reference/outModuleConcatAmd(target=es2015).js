//// [tests/cases/compiler/outModuleConcatAmd.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }

//// [all.js]
define("ref/a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    class A {
    }
    exports.A = A;
});
define("b", ["require", "exports", "ref/a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = void 0;
    class B extends a_1.A {
    }
    exports.B = B;
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
