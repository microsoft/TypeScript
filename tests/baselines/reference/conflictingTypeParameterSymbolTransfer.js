//// [tests/cases/compiler/conflictingTypeParameterSymbolTransfer.ts] ////

//// [conflictingTypeParameterSymbolTransfer.ts]
// @strict

// Via #56620
class Base<U> { }
export class C2<T> extends Base<unknown> {
    T: number;
    constructor(T: number) {
        super();
        // Should not error
        this.T = T;

        // Should error
        let a: U = null;
    }
}

// via #56689
class Leg { }
class Foo<t> extends Leg {
    t = {} as t

    // should allow this access since t was declared as a property on Foo
    foo = this.t
}

// via #56661
class BaseClass { }
class Item<data> extends BaseClass {
    data: data;
    getData() {
        // should OK
        return this.data;
    }
}

//// [conflictingTypeParameterSymbolTransfer.js]
"use strict";
// @strict
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
exports.C2 = void 0;
// Via #56620
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2(T) {
        var _this = _super.call(this) || this;
        // Should not error
        _this.T = T;
        // Should error
        var a = null;
        return _this;
    }
    return C2;
}(Base));
exports.C2 = C2;
// via #56689
var Leg = /** @class */ (function () {
    function Leg() {
    }
    return Leg;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.t = {};
        // should allow this access since t was declared as a property on Foo
        _this.foo = _this.t;
        return _this;
    }
    return Foo;
}(Leg));
// via #56661
var BaseClass = /** @class */ (function () {
    function BaseClass() {
    }
    return BaseClass;
}());
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.getData = function () {
        // should OK
        return this.data;
    };
    return Item;
}(BaseClass));
