// @declaration: true
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
