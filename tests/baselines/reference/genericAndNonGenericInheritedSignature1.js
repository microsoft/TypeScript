//// [genericAndNonGenericInheritedSignature1.ts]
interface Foo {
    f(x: any): any;
}
interface Bar {
    f<T>(x: T): T;
}
interface Hello extends Foo, Bar {
}


//// [genericAndNonGenericInheritedSignature1.js]
