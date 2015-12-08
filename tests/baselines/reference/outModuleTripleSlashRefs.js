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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./c.d.ts" />
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
define("ref/a", ["require", "exports"], function (require, exports) {
    "use strict";
    /// <reference path="./b.ts" />
    var A = (function () {
        function A() {
        }
        return A;
    })();
    exports.A = A;
});
define("b", ["require", "exports", "ref/a"], function (require, exports, a_1) {
    "use strict";
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

//// [all.d.ts]
/// <reference path="tests/cases/compiler/ref/c.d.ts" />
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
