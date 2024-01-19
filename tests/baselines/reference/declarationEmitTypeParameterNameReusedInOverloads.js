//// [tests/cases/compiler/declarationEmitTypeParameterNameReusedInOverloads.ts] ////

//// [declarationEmitTypeParameterNameReusedInOverloads.ts]
export class Base { foo: string; }
export class Derived extends Base { bar: string; }
export class Derived2 extends Derived { baz: string; }

export type Foo = {
    new (x: {
        new <T extends Derived>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
    new (x: {
        new <T extends Derived2>(a: T): T;
            new <T extends Base>(a: T): T;
    }): any[];
}


//// [declarationEmitTypeParameterNameReusedInOverloads.js]
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
exports.Derived2 = exports.Derived = exports.Base = void 0;
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
exports.Base = Base;
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
exports.Derived = Derived;
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Derived));
exports.Derived2 = Derived2;


//// [declarationEmitTypeParameterNameReusedInOverloads.d.ts]
export declare class Base {
    foo: string;
}
export declare class Derived extends Base {
    bar: string;
}
export declare class Derived2 extends Derived {
    baz: string;
}
export type Foo = {
    new (x: {
        new <T extends Derived>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
    new (x: {
        new <T extends Derived2>(a: T): T;
        new <T extends Base>(a: T): T;
    }): any[];
};
