// @target: esnext
// @lib: es2023,es2024.arraybuffer
// @noemit: true
// @strict: true

const buffer = new ArrayBuffer(8);
const buffer2 = buffer.transfer();

buffer.detached;
buffer2.detached;
