//// [tests/cases/conformance/decorators/class/constructor/decoratorOnClassConstructor3.ts] ////

//// [0.ts]
export class base { }
export function foo(target: Object, propertyKey: string | symbol, parameterIndex: number) { }

//// [2.ts]
import {base} from "./0"
import {foo} from "./0"

/* Comment on the Class Declaration */
export class C  extends base{
    constructor(@foo prop: any) {
        super();
    }
}

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.base = void 0;
var base = /** @class */ (function () {
    function base() {
    }
    return base;
}());
exports.base = base;
function foo(target, propertyKey, parameterIndex) { }
exports.foo = foo;
//// [2.js]
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var _0_1 = require("./0");
var _0_2 = require("./0");
/* Comment on the Class Declaration */
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(prop) {
        return _super.call(this) || this;
    }
    C = __decorate([
        __param(0, _0_2.foo)
    ], C);
    return C;
}(_0_1.base));
exports.C = C;
