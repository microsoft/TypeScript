// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59062

function f<_T, _S>() {
  interface NumArray<T extends number> extends Array<T> {}
  type X = NumArray<X extends {} ? number : number>;
}
