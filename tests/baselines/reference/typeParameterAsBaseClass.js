//// [tests/cases/compiler/typeParameterAsBaseClass.ts] ////

//// [typeParameterAsBaseClass.ts]
class C<T> extends T {}
class C2<T> implements T {}

//// [typeParameterAsBaseClass.js]
"use strict";
class C extends T {
}
class C2 {
}
