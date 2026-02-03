//// [tests/cases/compiler/interfaceMergeWithNonGenericTypeArguments.ts] ////

//// [interfaceMergeWithNonGenericTypeArguments.ts]
export class SomeBaseClass { }
export interface SomeInterface { }
export interface MergedClass extends SomeInterface { }
export class MergedClass extends SomeBaseClass<any> {
	public constructor() {
		super();
	}
}

//// [interfaceMergeWithNonGenericTypeArguments.js]
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
exports.MergedClass = exports.SomeBaseClass = void 0;
var SomeBaseClass = /** @class */ (function () {
    function SomeBaseClass() {
    }
    return SomeBaseClass;
}());
exports.SomeBaseClass = SomeBaseClass;
var MergedClass = /** @class */ (function (_super) {
    __extends(MergedClass, _super);
    function MergedClass() {
        return _super.call(this) || this;
    }
    return MergedClass;
}(SomeBaseClass));
exports.MergedClass = MergedClass;
