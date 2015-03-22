interface Foo {
    f(x: any): any;
}
interface Bar {
    f<T>(x: T): T;
}
interface Hello extends Bar, Foo {
}
