//// [tests/cases/compiler/genericTypeUsedWithoutTypeArguments1.ts] ////

//// [genericTypeUsedWithoutTypeArguments1.ts]
interface Foo<T> { }
class Bar<T> implements Foo { }


//// [genericTypeUsedWithoutTypeArguments1.js]
class Bar {
}
