//// [tests/cases/compiler/inheritFromGenericTypeParameter.ts] ////

//// [inheritFromGenericTypeParameter.ts]
class C<T> extends T { }
interface I<T> extends T { }

//// [inheritFromGenericTypeParameter.js]
class C extends T {
}
