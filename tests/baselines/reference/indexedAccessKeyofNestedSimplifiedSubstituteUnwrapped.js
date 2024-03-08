//// [tests/cases/compiler/indexedAccessKeyofNestedSimplifiedSubstituteUnwrapped.ts] ////

//// [indexedAccessKeyofNestedSimplifiedSubstituteUnwrapped.ts]
type AnyFunction = (...args: any[]) => any;
type Params<T> = Parameters<Extract<T, AnyFunction>>;

interface Wrapper<T> {
	call<K extends keyof T>(event: K, ...args: Params<T[K]>): void;
}

interface AWrapped {
	foo(): void;
}

class A {
	foo: Wrapper<AWrapped>;
}

interface BWrapped extends AWrapped {
	bar(): void;
}

class B extends A {
	foo: Wrapper<BWrapped>;
}

//// [indexedAccessKeyofNestedSimplifiedSubstituteUnwrapped.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
