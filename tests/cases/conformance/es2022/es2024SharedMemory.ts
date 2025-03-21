// @target: esnext
// @lib: es2022
// @noemit: true
// @strict: true

// ES2024 Atomics.waitAsync was included in the ES2022 type file due to a mistake.
// This test file checks if it fails successfully.
// https://github.com/microsoft/TypeScript/pull/58573#issuecomment-2119347142

const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1024);
const int32 = new Int32Array(sab);
const sab64 = new SharedArrayBuffer(BigInt64Array.BYTES_PER_ELEMENT * 1024);
const int64 = new BigInt64Array(sab64);
const waitValue = Atomics.wait(int32, 0, 0);
const { async, value } = Atomics.waitAsync(int32, 0, 0);
const { async: async64, value: value64 } = Atomics.waitAsync(int64, 0, BigInt(0));

const main = async () => {
    if (async) {
        await value;
    }
    if (async64) {
        await value64;
    }
}
main();
