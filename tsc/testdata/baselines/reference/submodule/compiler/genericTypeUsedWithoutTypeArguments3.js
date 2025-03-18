//// [tests/cases/compiler/genericTypeUsedWithoutTypeArguments3.ts] ////

//// [genericTypeUsedWithoutTypeArguments3.ts]
interface Foo<T> { }
interface Bar<T> extends Foo { }


//// [genericTypeUsedWithoutTypeArguments3.js]
