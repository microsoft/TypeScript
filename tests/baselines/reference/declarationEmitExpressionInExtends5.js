//// [declarationEmitExpressionInExtends5.ts]
namespace Test
{
	export interface IFace
	{
	}

	export class SomeClass implements IFace
	{
	}

	export class Derived extends getClass<IFace>()
	{
	}

	export function getClass<T>() : new() => T
	{
		return SomeClass as (new() => T);
	}
}


//// [declarationEmitExpressionInExtends5.js]
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
var Test;
(function (Test) {
    var SomeClass = /** @class */ (function () {
        function SomeClass() {
        }
        return SomeClass;
    }());
    Test.SomeClass = SomeClass;
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Derived;
    }(getClass()));
    Test.Derived = Derived;
    function getClass() {
        return SomeClass;
    }
    Test.getClass = getClass;
})(Test || (Test = {}));


//// [declarationEmitExpressionInExtends5.d.ts]
declare namespace Test {
    export interface IFace {
    }
    export class SomeClass implements IFace {
    }
    const Derived_base: new () => IFace;
    export class Derived extends Derived_base {
    }
    export function getClass<T>(): new () => T;
    export {};
}
