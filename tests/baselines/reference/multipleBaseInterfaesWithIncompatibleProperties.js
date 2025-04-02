//// [tests/cases/compiler/multipleBaseInterfaesWithIncompatibleProperties.ts] ////

//// [multipleBaseInterfaesWithIncompatibleProperties.ts]
interface A<T>
{
    x: T
}

interface C extends A<string>, A<number> { }


//// [multipleBaseInterfaesWithIncompatibleProperties.js]
