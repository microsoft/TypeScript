// @target: es5
// @module: commonjs
// @importHelpers: true
// @strict: true

// @filename: foo.ts
function id<T>(x: T) {
  return x;
}

export const result = id `hello world`;

// @filename: ./node_modules/tslib/index.d.ts
export { };
