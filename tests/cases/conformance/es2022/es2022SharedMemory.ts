// @target: esnext
// @lib: es2022
// @noemit: true
// @strict: true

const sab32 = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1024);
const sab64 = new SharedArrayBuffer(BigInt64Array.BYTES_PER_ELEMENT * 1024);
const int32 = new Int32Array(sab32);
const int64 = new BigInt64Array(sab64);
const waitValue = Atomics.wait(int32, 0, 0);
const { async: async32, value: value32 } = Atomics.waitAsync(int32, 0, 0);
const { async: async64, value: value64 } = Atomics.waitAsync(int64, 0, BigInt(0));

const main = async () => {
    if (async32) {
        await value32;
    }
    if (async64) {
        await value64;
    }
}
main();