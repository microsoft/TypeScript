//// [expressionPropertyLookupIncludesMixins.ts]
// https://github.com/microsoft/TypeScript/issues/31426

export type AnyFunction<A = any>        = (...input : any[]) => A
export type AnyConstructor<A = object>  = new (...input : any[]) => A
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>

export const Box = <T extends AnyConstructor<object>>(base : T) =>
class Box extends base {
    value       : any
}
export interface Box extends Mixin<typeof Box> {}

export const Observable = <T extends AnyConstructor<object>>(base : T) =>
class Observable extends base {
    observe () : IQuark {
        return
    }
}
export interface Observable extends Mixin<typeof Observable> {}

export const CQuark = <T extends AnyConstructor<Box & Observable>>(base : T) =>
class Quark extends base {

    observe () : Quark {
        // No error here!
        this.value
        
        
        return
    }
}
export interface IQuark extends Mixin<typeof CQuark> {}

const test = (a : IQuark) => a.value // <-- Should not error


//// [expressionPropertyLookupIncludesMixins.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/31426
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
exports.__esModule = true;
exports.Box = function (base) {
    return /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Box;
    }(base));
};
exports.Observable = function (base) {
    return /** @class */ (function (_super) {
        __extends(Observable, _super);
        function Observable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Observable.prototype.observe = function () {
            return;
        };
        return Observable;
    }(base));
};
exports.CQuark = function (base) {
    return /** @class */ (function (_super) {
        __extends(Quark, _super);
        function Quark() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Quark.prototype.observe = function () {
            // No error here!
            this.value;
            return;
        };
        return Quark;
    }(base));
};
var test = function (a) { return a.value; }; // <-- Should not error
