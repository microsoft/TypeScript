//// [tests/cases/compiler/incompatibleAssignmentOfIdenticallyNamedTypes.ts] ////

//// [incompatibleAssignmentOfIdenticallyNamedTypes.ts]
interface T { }
declare const a: T;
class Foo<T> {
    x: T;
    fn() {
        this.x = a;
    }
}


//// [incompatibleAssignmentOfIdenticallyNamedTypes.js]
class Foo {
    x;
    fn() {
        this.x = a;
    }
}
