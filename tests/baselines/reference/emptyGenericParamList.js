//// [tests/cases/compiler/emptyGenericParamList.ts] ////

//// [emptyGenericParamList.ts]
class I<T> {}
var x: I<>;

//// [emptyGenericParamList.js]
"use strict";
class I {
}
var x;
