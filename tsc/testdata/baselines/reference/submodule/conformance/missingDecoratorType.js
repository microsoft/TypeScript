//// [tests/cases/conformance/decorators/missingDecoratorType.ts] ////

//// [a.ts]
interface Object { }
interface Array<T> { }
interface String { }
interface Boolean { }
interface Number { }
interface Function { }
interface RegExp { }
interface IArguments { }

//// [b.ts]
declare function dec(t, k, d);

class C {
    @dec
    method() {}
}



//// [a.js]
//// [b.js]
class C {
    @dec
    method() { }
}
