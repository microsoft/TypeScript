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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="./c.d.ts" />
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
define("ref/a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="./b.ts" />
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
define("b", ["require", "exports", "ref/a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(a_1.A));
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
