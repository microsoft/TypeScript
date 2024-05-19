// @lib: es2023,es2024.arraybuffer

const buffer = new ArrayBuffer(8);
const buffer2 = buffer.transfer();

buffer.detached;
buffer2.detached;
