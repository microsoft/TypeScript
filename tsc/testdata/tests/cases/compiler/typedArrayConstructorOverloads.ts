// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/60367

type TypedArrayConstructor =
    | Int8ArrayConstructor
    | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Int16ArrayConstructor
    | Uint16ArrayConstructor
    | Int32ArrayConstructor
    | Uint32ArrayConstructor
    | Float16ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor
    | BigInt64ArrayConstructor
    | BigUint64ArrayConstructor

export function makeTypedArray(buffer: ArrayBuffer, ctr: TypedArrayConstructor) {
    new ctr(buffer);
    new ctr(buffer, 0, 0);
}

// https://github.com/microsoft/TypeScript/issues/44191

const uint8Array = new Uint8Array(4);
// @ts-expect-error typed array inputs do not accept byteOffset and length
new Uint8Array(uint8Array, 0, 1);

const bigInt64Array = new BigInt64Array(4);
// @ts-expect-error typed array inputs do not accept byteOffset and length
new BigInt64Array(bigInt64Array, 0, 1);
