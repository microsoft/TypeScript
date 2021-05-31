// @target: esnext
// @module: esnext
await x;

const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}
