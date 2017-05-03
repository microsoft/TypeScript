//// [tests/cases/compiler/unusedInvalidTypeArguments.ts] ////

//// [typeReference.ts]
// Tests that types are marked as used, even if used in places that don't accept type arguments.


type N = number;
type U = number;
export type Z = U<N>;

//// [classReference.ts]
type N = number;
class C { }
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
export class D extends C<N> {}

//// [interface.ts]
import { Foo } from "unknown";
export interface I<T> { x: Foo<T>; }

//// [call.ts]
import { foo } from "unknown";
type T = number;
foo<T>();

//// [new.ts]
import { Foo } from "unkown";
type T = number;
new Foo<T>();

//// [callAny.ts]
declare var g: any;
type U = number;
g<U>();
g<InvalidReference>(); // Should get error for type argument

//// [super.ts]
import { C } from "unknown";

type T = number;

export class D extends C {
    m() {
        super.m<T>(1);
        super.m<InvalidReference>(); // Should get error for type argument
    }
}


//// [typeReference.js]
"use strict";
// Tests that types are marked as used, even if used in places that don't accept type arguments.
exports.__esModule = true;
//// [classReference.js]
"use strict";
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
exports.__esModule = true;
var C = (function () {
    function C() {
    }
    return C;
}());
// This uses getTypeFromClassOrInterfaceReference instead of getTypeFromTypeAliasReference.
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
exports.D = D;
//// [interface.js]
"use strict";
exports.__esModule = true;
//// [call.js]
"use strict";
exports.__esModule = true;
var unknown_1 = require("unknown");
unknown_1.foo();
//// [new.js]
"use strict";
exports.__esModule = true;
var unkown_1 = require("unkown");
new unkown_1.Foo();
//// [callAny.js]
g();
g(); // Should get error for type argument
//// [super.js]
"use strict";
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
exports.__esModule = true;
var unknown_1 = require("unknown");
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.m = function () {
        _super.prototype.m.call(this, 1);
        _super.prototype.m.call(this); // Should get error for type argument
    };
    return D;
}(unknown_1.C));
exports.D = D;
