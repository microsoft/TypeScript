//// [tests/cases/compiler/outModuleTripleSlashRefs.ts] ////

//// [a.ts]
/// <reference path="./b.ts" />
export class A {
	member: typeof GlobalFoo;
}

//// [b.ts]
/// <reference path="./c.d.ts" />
class Foo {
	member: Bar;
}
declare var GlobalFoo: Foo;

//// [c.d.ts]
/// <reference path="./d.d.ts" />
declare class Bar {
	member: Baz;
}

//// [d.d.ts]
declare class Baz {
	member: number;
}

//// [b.ts]
import {A} from "./ref/a";
export class B extends A { }


//// [all.js]
/// <reference path="./c.d.ts" />
class Foo {
}
define("ref/a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    /// <reference path="./b.ts" />
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
declare class Foo {
    member: Bar;
}
declare var GlobalFoo: Foo;
declare module "ref/a" {
    export class A {
        member: typeof GlobalFoo;
    }
}
declare module "b" {
    import { A } from "ref/a";
    export class B extends A {
    }
}
