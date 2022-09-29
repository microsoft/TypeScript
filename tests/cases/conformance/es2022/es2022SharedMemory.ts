// @target: esnext
// @lib: es2022
// @noemit: true
// @strict: true

const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1024);
const int32 = new Int32Array(sab);
const waitValue = Atomics.wait(int32, 0, 0);
const { async, value } = Atomics.waitAsync(int32, 0, BigInt(0));

const main = async () => {
    if (async) {
        await value;
    }
}
main();