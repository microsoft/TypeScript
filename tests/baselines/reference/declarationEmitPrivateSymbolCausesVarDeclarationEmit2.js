//// [tests/cases/compiler/declarationEmitPrivateSymbolCausesVarDeclarationEmit2.ts] ////

//// [a.ts]
export const x = Symbol();

//// [b.ts]
import { x } from "./a";

export class C {
  private [x]: number = 1;
}

//// [c.ts]
import { x } from "./a";
import { C } from "./b";

export class D extends C {
  private [x]: 12 = 12;
}


//// [a.js]
"use strict";
exports.__esModule = true;
exports.x = Symbol();
//// [b.js]
"use strict";
exports.__esModule = true;
var _a;
var a_1 = require("./a");
var C = /** @class */ (function () {
    function C() {
        this[_a] = 1;
    }
    return C;
}());
_a = a_1.x;
exports.C = C;
//// [c.js]
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
var _a;
var a_1 = require("./a");
var b_1 = require("./b");
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this[_a] = 12;
        return _this;
    }
    return D;
}(b_1.C));
_a = a_1.x;
exports.D = D;


//// [a.d.ts]
export declare const x: unique symbol;
//// [b.d.ts]
import { x } from "./a";
export declare class C {
    private [x];
}
//// [c.d.ts]
import { x } from "./a";
import { C } from "./b";
export declare class D extends C {
    private [x];
}
