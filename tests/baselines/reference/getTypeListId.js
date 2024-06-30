//// [tests/cases/compiler/getTypeListId.ts] ////

//// [getTypeListId.ts]
function f<_T, _S>() {
	interface NumArray<T extends number> extends Array<T> {}
	type X = NumArray<X extends {} ? number : number>;
}


//// [getTypeListId.js]
function f() {
}
