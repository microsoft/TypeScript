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

// https://github.com/microsoft/TypeScript/issues/61680

export function makeGenericTypedArrays(
    numIterable: Iterable<number>,
    numUnion: ArrayLike<number> | ArrayBuffer,
    bigintIterable: Iterable<bigint>,
    bigintUnion: ArrayLike<bigint> | ArrayBuffer,
) {
    const source = new Uint8Array(10);
    const copy1: Uint8Array<ArrayBuffer> = new Uint8Array(source);
    const copy2: Uint8Array<ArrayBufferLike> = new Uint8Array<ArrayBufferLike>(source);
    const copy3: Uint8Array<ArrayBuffer> = new Uint8Array<ArrayBuffer>(source);

    new Int8Array<ArrayBufferLike>();
    new Int8Array<ArrayBufferLike>(10);
    new Int8Array<ArrayBufferLike>(source);
    new Int8Array<ArrayBufferLike>(numIterable);
    new Int8Array<ArrayBufferLike>(numUnion);

    new Uint8Array<ArrayBufferLike>();
    new Uint8Array<ArrayBufferLike>(10);
    new Uint8Array<ArrayBufferLike>(source);
    new Uint8Array<ArrayBufferLike>(numIterable);
    new Uint8Array<ArrayBufferLike>(numUnion);

    new Uint8ClampedArray<ArrayBufferLike>();
    new Uint8ClampedArray<ArrayBufferLike>(10);
    new Uint8ClampedArray<ArrayBufferLike>(source);
    new Uint8ClampedArray<ArrayBufferLike>(numIterable);
    new Uint8ClampedArray<ArrayBufferLike>(numUnion);

    new Int16Array<ArrayBufferLike>();
    new Int16Array<ArrayBufferLike>(10);
    new Int16Array<ArrayBufferLike>(source);
    new Int16Array<ArrayBufferLike>(numIterable);
    new Int16Array<ArrayBufferLike>(numUnion);

    new Uint16Array<ArrayBufferLike>();
    new Uint16Array<ArrayBufferLike>(10);
    new Uint16Array<ArrayBufferLike>(source);
    new Uint16Array<ArrayBufferLike>(numIterable);
    new Uint16Array<ArrayBufferLike>(numUnion);

    new Int32Array<ArrayBufferLike>();
    new Int32Array<ArrayBufferLike>(10);
    new Int32Array<ArrayBufferLike>(source);
    new Int32Array<ArrayBufferLike>(numIterable);
    new Int32Array<ArrayBufferLike>(numUnion);

    new Uint32Array<ArrayBufferLike>();
    new Uint32Array<ArrayBufferLike>(10);
    new Uint32Array<ArrayBufferLike>(source);
    new Uint32Array<ArrayBufferLike>(numIterable);
    new Uint32Array<ArrayBufferLike>(numUnion);

    new Float16Array<ArrayBufferLike>();
    new Float16Array<ArrayBufferLike>(10);
    new Float16Array<ArrayBufferLike>(source);
    new Float16Array<ArrayBufferLike>(numIterable);
    new Float16Array<ArrayBufferLike>(numUnion);

    new Float32Array<ArrayBufferLike>();
    new Float32Array<ArrayBufferLike>(10);
    new Float32Array<ArrayBufferLike>(source);
    new Float32Array<ArrayBufferLike>(numIterable);
    new Float32Array<ArrayBufferLike>(numUnion);

    new Float64Array<ArrayBufferLike>();
    new Float64Array<ArrayBufferLike>(10);
    new Float64Array<ArrayBufferLike>(source);
    new Float64Array<ArrayBufferLike>(numIterable);
    new Float64Array<ArrayBufferLike>(numUnion);

    const bigintSource = new BigInt64Array(10);
    new BigInt64Array<ArrayBufferLike>();
    new BigInt64Array<ArrayBufferLike>(10);
    new BigInt64Array<ArrayBufferLike>(bigintSource);
    new BigInt64Array<ArrayBufferLike>(bigintIterable);
    new BigInt64Array<ArrayBufferLike>(bigintUnion);

    new BigUint64Array<ArrayBufferLike>();
    new BigUint64Array<ArrayBufferLike>(10);
    new BigUint64Array<ArrayBufferLike>(bigintSource);
    new BigUint64Array<ArrayBufferLike>(bigintIterable);
    new BigUint64Array<ArrayBufferLike>(bigintUnion);
}

export class EncodedString extends Uint8Array<ArrayBufferLike> {
    static encode(value: string): Uint8Array<ArrayBuffer> {
        return new Uint8Array(value.length);
    }

    constructor(value: string);
    constructor(value: ArrayBufferLike, byteOffset?: number, byteLength?: number);
    constructor(value: string | ArrayBufferLike, byteOffset?: number, byteLength?: number) {
        if (typeof value === "string") {
            const encoded = EncodedString.encode(value);
            super(encoded);
        }
        else {
            super(value, byteOffset, byteLength);
        }
    }
}

export class GenericSubUint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> extends Uint8Array<TArrayBuffer> {
    constructor(value?: number | ArrayLike<number> | Iterable<number> | TArrayBuffer) {
        if (value === undefined) {
            super();
        }
        else if (typeof value === "number") {
            super(value);
        }
        else if ("maxByteLength" in value) {
            super(value);
        }
        else if (Symbol.iterator in value) {
            super(value);
        }
        else {
            super(value);
        }
    }
}

