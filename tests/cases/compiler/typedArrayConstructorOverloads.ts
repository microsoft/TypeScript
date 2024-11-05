// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/60367

type TypedArrayConstructor =
    | Float64ArrayConstructor
    | BigInt64ArrayConstructor

export function makeTypedArray(buffer: ArrayBuffer, ctr: TypedArrayConstructor) {
  return new ctr(buffer);
}
