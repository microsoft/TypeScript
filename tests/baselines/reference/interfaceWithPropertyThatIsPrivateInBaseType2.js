//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithPropertyThatIsPrivateInBaseType2.ts] ////

//// [interfaceWithPropertyThatIsPrivateInBaseType2.ts]
class Base {
    private x() {}
}

interface Foo extends Base { // error
    x(): any;
}

class Base2<T> {
    private x() { }
}

interface Foo2<T> extends Base2<T> { // error
    x(): any;
}

//// [interfaceWithPropertyThatIsPrivateInBaseType2.js]
class Base {
    x() { }
}
class Base2 {
    x() { }
}
