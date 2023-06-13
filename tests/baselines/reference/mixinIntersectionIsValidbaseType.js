//// [tests/cases/compiler/mixinIntersectionIsValidbaseType.ts] ////

//// [mixinIntersectionIsValidbaseType.ts]
export type Constructor<T extends object = object> = new (...args: any[]) => T;

export interface Initable {
    init(...args: any[]): void;
}

/**
 * Plain mixin where the superclass must be Initable
 */
export const Serializable = <K extends Constructor<Initable> & Initable>(
    SuperClass: K
) => {
    const LocalMixin = (InnerSuperClass: K) => {
        return class SerializableLocal extends InnerSuperClass {
        }
    };
    let ResultClass = LocalMixin(SuperClass);
    return ResultClass;
};

const AMixin = <K extends Constructor<Initable> & Initable>(SuperClass: K) => {
    let SomeHowOkay = class A extends SuperClass {
    };

    let SomeHowNotOkay = class A extends Serializable(SuperClass) {
    };
};

//// [mixinIntersectionIsValidbaseType.js]
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
exports.Serializable = void 0;
/**
 * Plain mixin where the superclass must be Initable
 */
var Serializable = function (SuperClass) {
    var LocalMixin = function (InnerSuperClass) {
        return /** @class */ (function (_super) {
            __extends(SerializableLocal, _super);
            function SerializableLocal() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SerializableLocal;
        }(InnerSuperClass));
    };
    var ResultClass = LocalMixin(SuperClass);
    return ResultClass;
};
exports.Serializable = Serializable;
var AMixin = function (SuperClass) {
    var SomeHowOkay = /** @class */ (function (_super) {
        __extends(A, _super);
        function A() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return A;
    }(SuperClass));
    var SomeHowNotOkay = /** @class */ (function (_super) {
        __extends(A, _super);
        function A() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return A;
    }((0, exports.Serializable)(SuperClass)));
};
