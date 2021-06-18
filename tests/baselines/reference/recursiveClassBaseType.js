//// [recursiveClassBaseType.ts]
// Repro from #44281

declare const p: <T>(fn: () => T) => T;

declare const Base: <T>(val: T) => { new(): T };

class C extends Base({ x: p<C[]>(() => []) }) { }

// Repro from #44359

abstract class Base1 {
    abstract root(): Derived1;
}

class Derived1 extends class extends Base1 {
    root() {
        return undefined as any;
    }
}
{ }


//// [recursiveClassBaseType.js]
"use strict";
// Repro from #44281
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
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(Base({ x: p(function () { return []; }) })));
// Repro from #44359
var Base1 = /** @class */ (function () {
    function Base1() {
    }
    return Base1;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived1;
}(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.root = function () {
        return undefined;
    };
    return class_1;
}(Base1))));


//// [recursiveClassBaseType.d.ts]
declare const p: <T>(fn: () => T) => T;
declare const Base: <T>(val: T) => {
    new (): T;
};
declare const C_base: new () => {
    x: C[];
};
declare class C extends C_base {
}
declare abstract class Base1 {
    abstract root(): Derived1;
}
declare const Derived1_base: {
    new (): {
        root(): any;
    };
};
declare class Derived1 extends Derived1_base {
}
