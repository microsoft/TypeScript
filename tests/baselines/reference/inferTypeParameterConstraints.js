//// [tests/cases/compiler/inferTypeParameterConstraints.ts] ////

//// [inferTypeParameterConstraints.ts]
// Repro from #42636

type SubGuard<A, X extends [A]> = X;

type IsSub<M extends any[], S extends any[]> = M extends [...SubGuard<M[number], infer B>, ...S, ...any[]] ? B : never;

type E0 = IsSub<[1, 2, 3, 4], [2, 3, 4]>;  // [1 | 2 | 3 | 4]

type E1 = [1, 2, 3, 4] extends [...infer B, 2, 3, 4, ...any[]] ? B : never;  // unknown[]

// Repro from #42636

type Constrain<T extends C, C> = unknown;

type Foo<A> = A extends Constrain<infer X, A> ? X : never;

type T0 = Foo<string>;  // string

// https://github.com/microsoft/TypeScript/issues/57286#issuecomment-1927920336

class BaseClass<V> {
  protected fake(): V {
    throw new Error("");
  }
}

class Klass<V> extends BaseClass<V> {
  child = true;
}

type Constructor<V, P extends BaseClass<V>> = new () => P;
type inferTest<V, T> = T extends Constructor<V, infer P> ? P : never;

type U = inferTest<number, Constructor<number, Klass<number>>>;

declare let m: U;
m.child; // ok


//// [inferTypeParameterConstraints.js]
"use strict";
// Repro from #42636
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
// https://github.com/microsoft/TypeScript/issues/57286#issuecomment-1927920336
var BaseClass = /** @class */ (function () {
    function BaseClass() {
    }
    BaseClass.prototype.fake = function () {
        throw new Error("");
    };
    return BaseClass;
}());
var Klass = /** @class */ (function (_super) {
    __extends(Klass, _super);
    function Klass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.child = true;
        return _this;
    }
    return Klass;
}(BaseClass));
m.child; // ok
