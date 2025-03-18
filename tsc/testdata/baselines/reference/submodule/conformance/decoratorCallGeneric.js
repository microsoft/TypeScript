//// [tests/cases/conformance/decorators/decoratorCallGeneric.ts] ////

//// [decoratorCallGeneric.ts]
interface I<T> {
    prototype: T,
    m: () => T
}
function dec<T>(c: I<T>) { }

@dec
class C {
    _brand: any;
    static m() {}
}


//// [decoratorCallGeneric.js]
function dec(c) { }
@dec
class C {
    _brand;
    static m() { }
}
