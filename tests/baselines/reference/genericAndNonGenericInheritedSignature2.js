//// [tests/cases/compiler/genericAndNonGenericInheritedSignature2.ts] ////

//// [genericAndNonGenericInheritedSignature2.ts]
interface Foo {
    f(x: any): any;
}
interface Bar {
    f<T>(x: T): T;
}
interface Hello extends Bar, Foo {
}


//// [genericAndNonGenericInheritedSignature2.js]
