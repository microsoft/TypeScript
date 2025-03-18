//// [tests/cases/compiler/declarationEmitExpressionInExtends5.ts] ////

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
var Test;
(function (Test) {
    class SomeClass {
    }
    Test.SomeClass = SomeClass;
    class Derived extends getClass() {
    }
    Test.Derived = Derived;
    function getClass() {
        return SomeClass;
    }
    Test.getClass = getClass;
})(Test || (Test = {}));
