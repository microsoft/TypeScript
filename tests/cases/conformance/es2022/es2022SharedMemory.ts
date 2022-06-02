// @target: esnext
// @lib: es2022.sharedmemory
// @noemit: true
// @strict: true

const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1024);
const int32 = new Int32Array(sab);
Atomics.wait(int32, 0, 0);
await Atomics.waitAsync(int32, 0, 0);
