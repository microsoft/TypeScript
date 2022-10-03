//// [interfaceThatInheritsFromItself.ts]
interface Foo extends Foo { // error
}

interface Foo2<T> extends Foo2<T> { // error
}

interface Foo3<T> extends Foo3<string> { // error
}

interface Bar implements Bar { // error
}



//// [interfaceThatInheritsFromItself.js]
