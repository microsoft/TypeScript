//// [tests/cases/compiler/unusedTypeParameters7.ts] ////

//// [a.ts]
class C<T> { a: T; }

//// [b.ts]
interface C<T> { }

//// [a.js]
class C {
    a;
}
//// [b.js]
