// no errors because in the derived types the best common type for T's value is Object
// and that matches the original signature for assignability since we treat its T's as Object

interface IFoo<T> {
    foo(x: T): T;
}
class C<T> implements IFoo<T> { // error
    foo(x: string): number {
        return null;
    }
}

interface IFoo2<T> {
    foo(x: T): T;
}
class C2<T> implements IFoo2<T> { // error
    foo<Tstring>(x: Tstring): number {
        return null;
    }
}