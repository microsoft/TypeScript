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

	export function getClass<T extends object>() : new() => T
	{
		return SomeClass as (new() => T);
	}
}
