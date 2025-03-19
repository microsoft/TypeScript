//// [tests/cases/compiler/inheritanceOfGenericConstructorMethod1.ts] ////

//// [inheritanceOfGenericConstructorMethod1.ts]
class A<T> { }
class B<T> extends A<T> {}
var a = new A<Date>();
var b1 = new B(); // no error
var b2: B<Date> = new B<Date>(); // no error
var b3 = new B<Date>(); // error, could not select overload for 'new' expression


//// [inheritanceOfGenericConstructorMethod1.js]
class A {
}
class B extends A {
}
var a = new A();
var b1 = new B(); // no error
var b2 = new B(); // no error
var b3 = new B(); // error, could not select overload for 'new' expression
