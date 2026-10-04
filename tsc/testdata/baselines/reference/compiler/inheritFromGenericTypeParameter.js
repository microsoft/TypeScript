//// [tests/cases/compiler/inheritFromGenericTypeParameter.ts] ////

//// [inheritFromGenericTypeParameter.ts]
class C<T> extends T { }
interface I<T> extends T { }

//// [inheritFromGenericTypeParameter.js]
"use strict";
class C extends T {
}
