//// [tests/cases/compiler/declFileGenericClassWithGenericExtendedClass.ts] ////

//// [declFileGenericClassWithGenericExtendedClass.ts]
interface IFoo {
    baz: Baz;
}
class Base<T> { }
class Derived<T> extends Base<T> { }
interface IBar<T> {
    derived: Derived<T>;
}
class Baz implements IBar<Baz> {
    derived: Derived<Baz>;
}


//// [declFileGenericClassWithGenericExtendedClass.js]
class Base {
}
class Derived extends Base {
}
class Baz {
    derived;
}
