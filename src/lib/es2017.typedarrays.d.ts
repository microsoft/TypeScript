interface TypedArrayConstructor<T extends number | bigint, A extends TypedArray<T, A>> {
    new (): A;
}

interface Int8ArrayConstructor extends TypedArrayConstructor<number, Int8Array> {}

interface Uint8ArrayConstructor extends TypedArrayConstructor<number, Uint8Array> {}

interface Uint8ClampedArrayConstructor extends TypedArrayConstructor<number, Uint8ClampedArray> {}

interface Int16ArrayConstructor extends TypedArrayConstructor<number, Int16Array> {}

interface Uint16ArrayConstructor extends TypedArrayConstructor<number, Uint16Array> {}

interface Int32ArrayConstructor extends TypedArrayConstructor<number, Int32Array> {}

interface Uint32ArrayConstructor extends TypedArrayConstructor<number, Uint32Array> {}

interface Float32ArrayConstructor extends TypedArrayConstructor<number, Float32Array> {}

interface Float64ArrayConstructor extends TypedArrayConstructor<number, Float64Array> {}
