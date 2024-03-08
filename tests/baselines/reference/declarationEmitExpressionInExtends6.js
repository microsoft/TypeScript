//// [tests/cases/compiler/declarationEmitExpressionInExtends6.ts] ////

//// [index.d.ts]
declare const require: any;

//// [a.ts]
export class Foo {}

//// [b.ts]
import * as A from "./a";
const { Foo } = A;
export default class extends Foo {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [b.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var A = require("./a");
var Foo = A.Foo;
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return default_1;
}(Foo));
exports.default = default_1;


//// [a.d.ts]
export declare class Foo {
}
//// [b.d.ts]
import * as A from "./a";
declare const Foo: typeof A.Foo;
export default class extends Foo {
}
export {};
