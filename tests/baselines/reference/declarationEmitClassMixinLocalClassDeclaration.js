//// [tests/cases/compiler/declarationEmitClassMixinLocalClassDeclaration.ts] ////

//// [declarationEmitClassMixinLocalClassDeclaration.ts]
export type AnyFunction<Result = any> = (...input: any[]) => Result

export type AnyConstructor<Instance extends object = object, Static extends object = object> =
    (new (...input: any[]) => Instance) & Static


type MixinHelperFunc = <A extends AnyConstructor, T>(required: [A], arg: T) => T extends AnyFunction<infer M> ? M : never


export const Mixin: MixinHelperFunc = null as any


export class Base {}


export class XmlElement2 extends Mixin(
    [Base],
    (base: AnyConstructor<Base, typeof Base>) => {
        class XmlElement2 extends base {
            num: number = 0
        }
        return XmlElement2;
    }) { }


//// [declarationEmitClassMixinLocalClassDeclaration.js]
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
exports.XmlElement2 = exports.Base = exports.Mixin = void 0;
exports.Mixin = null;
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
exports.Base = Base;
var XmlElement2 = /** @class */ (function (_super) {
    __extends(XmlElement2, _super);
    function XmlElement2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XmlElement2;
}((0, exports.Mixin)([Base], function (base) {
    var XmlElement2 = /** @class */ (function (_super) {
        __extends(XmlElement2, _super);
        function XmlElement2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.num = 0;
            return _this;
        }
        return XmlElement2;
    }(base));
    return XmlElement2;
})));
exports.XmlElement2 = XmlElement2;


//// [declarationEmitClassMixinLocalClassDeclaration.d.ts]
export type AnyFunction<Result = any> = (...input: any[]) => Result;
export type AnyConstructor<Instance extends object = object, Static extends object = object> = (new (...input: any[]) => Instance) & Static;
type MixinHelperFunc = <A extends AnyConstructor, T>(required: [A], arg: T) => T extends AnyFunction<infer M> ? M : never;
export declare const Mixin: MixinHelperFunc;
export declare class Base {
}
declare const XmlElement2_base: {
    new (): {
        num: number;
    };
};
export declare class XmlElement2 extends XmlElement2_base {
}
export {};
