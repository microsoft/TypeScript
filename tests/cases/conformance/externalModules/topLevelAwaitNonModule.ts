// @target: esnext
// @module: es2022,esnext
await x;

const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}
