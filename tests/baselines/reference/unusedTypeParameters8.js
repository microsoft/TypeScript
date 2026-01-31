//// [tests/cases/compiler/unusedTypeParameters8.ts] ////

//// [a.ts]
class C<T> { }

//// [b.ts]
interface C<T> { }

//// [a.js]
class C {
}
//// [b.js]
