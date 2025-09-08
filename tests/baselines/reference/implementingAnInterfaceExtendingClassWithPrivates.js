//// [tests/cases/conformance/interfaces/interfacesExtendingClasses/implementingAnInterfaceExtendingClassWithPrivates.ts] ////

//// [implementingAnInterfaceExtendingClassWithPrivates.ts]
class Foo {
    private x: string;
}

interface I extends Foo {
    y: number;
}

class Bar implements I { // error
}

class Bar2 implements I { // error
    y: number;
}

class Bar3 implements I { // error
    x: string;
    y: number;
}

class Bar4 implements I { // error
    private x: string;
    y: number;
}

//// [implementingAnInterfaceExtendingClassWithPrivates.js]
class Foo {
    x;
}
class Bar {
}
class Bar2 {
    y;
}
class Bar3 {
    x;
    y;
}
class Bar4 {
    x;
    y;
}
