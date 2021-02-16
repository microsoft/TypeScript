//// [tests/cases/conformance/externalModules/typeOnly/extendsClause.ts] ////

//// [types.ts]
export interface I {}
export class C {}

//// [ns.ts]
import type * as types from './types';
export { types };

//// [index.ts]
import { types } from './ns';
import type { C, I } from './types';

interface Q extends C {}
interface R extends I {}
interface S extends types.C {}
interface T extends types.I {}

class U extends C {} // Error
class V extends types.C {} // Error


//// [types.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [ns.js]
"use strict";
exports.__esModule = true;
//// [index.js]
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
exports.__esModule = true;
var U = /** @class */ (function (_super) {
    __extends(U, _super);
    function U() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return U;
}(C)); // Error
var V = /** @class */ (function (_super) {
    __extends(V, _super);
    function V() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return V;
}(types.C)); // Error
