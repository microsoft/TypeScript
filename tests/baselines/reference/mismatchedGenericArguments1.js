//// [tests/cases/compiler/mismatchedGenericArguments1.ts] ////

//// [mismatchedGenericArguments1.ts]
interface IFoo<T> {
   foo<T>(x: T): T;
}
class C<T> implements IFoo<T> {
   foo(x: string): number {
     return null;
   }
}

class C2<T> implements IFoo<T> {
   foo<U>(x: string): number {
     return null;
   }
}


//// [mismatchedGenericArguments1.js]
class C {
    foo(x) {
        return null;
    }
}
class C2 {
    foo(x) {
        return null;
    }
}
