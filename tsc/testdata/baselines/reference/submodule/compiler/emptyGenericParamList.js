//// [tests/cases/compiler/emptyGenericParamList.ts] ////

//// [emptyGenericParamList.ts]
class I<T> {}
var x: I<>;

//// [emptyGenericParamList.js]
class I {
}
var x;
