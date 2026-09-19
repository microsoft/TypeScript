// @strict: true
// @target: esnext
// @lib: esnext,dom

crypto.getRandomValues(new Uint8Array(1));
crypto.getRandomValues(new BigInt64Array(1));
crypto.getRandomValues(new Float64Array(1));
crypto.getRandomValues(null);

declare const buffer: Uint8Array<ArrayBufferLike>;
crypto.getRandomValues(buffer);

declare const array: Parameters<typeof crypto.getRandomValues>[0];
const values = crypto.getRandomValues(array);
values.BYTES_PER_ELEMENT;

declare const integers: IntegerTypedArray;
const ints: IntegerTypedArrayTypes["Int32Array"] = new Int32Array(1);
